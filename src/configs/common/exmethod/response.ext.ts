/**
 * @author DuyTM
 * @description customer extension response
 * @since 2018/03/20
 */

import * as chalk from 'chalk';
import * as express from 'express';

import { ConstLib } from '../consts';
import { ConfigBase } from '../config.base';

import {
  BaseError,
  GoneError,
  ErrorsConst,
  NotFoundError,
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
  UnprocessableEntityError
} from '../error';
import { Logger } from '../../../logger';
import { Environment, ResponseError, } from '../models';
import { Utils } from '../utils';

const exp: any = <any>express;

/**
 * @method ok
 * @description customer response success
 * @param data
 */
exp.response['ok'] = function (data?: any) {
  const _this: express.Response = this;
  if (_this.statusCode >= 400) {
    throw new RangeError(ConstLib.STATUS_INVALID);
  }
  _this.json(data);
};

/**
 * @method bad
 * @description customer response failed
 * @summary file attach is delete if response is failed
 * @param code
 * @param message
 * @param errors
 * @return {Response}
 */
exp.response['bad'] = function (code: any, message: any, errors: any) {
  const _this: express.Response = this;
  const status = (code ? code.status : undefined) || (_this.statusCode < 400 ? 400 : _this.statusCode);
  if (status < 400) {
    throw new RangeError(ConstLib.STATUS_INVALID);
  }
  if ('object' === typeof code) {
    if (ErrorsConst.SERVER_ERRORS.indexOf(code.name) > -1) {
      console.error(
        chalk.default.bgRed.white('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n',
          code.stack, '\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
      );
      return _this.status(500).json(mapError(code, _this));
    } else if (code.code && code.code === 'LIMIT_FILE_SIZE') {
      return _this.status(413).json(mapError(code, _this));
    }
    return _this.status(status).json(mapError(code, _this));
  }
  return _this.status(status).json(mapError({ status, code, message, errors }, _this));
};

exp.response['badParam'] = function (errors: any) {
  return this.bad(new UnprocessableEntityError({
    message: Object.values<{ msg: string }>(errors)[0].msg,
    error: errors
  }
  ));
};

/**
 * @method maoError
 * @description map error data
 * @param error
 * @param _this -req, res global
 * @return {ResponseError}
 */
function mapError(error: any, _this: any): ResponseError {
  if (!error || 'object' !== typeof error) return undefined;
  const verifyCustomerError = ([
    BaseError.name, ConflictError.name, ForbiddenError.name, GoneError.name, NotFoundError.name,
    UnauthorizedError.name, UnprocessableEntityError.name].indexOf(error.constructor.name) > -1 || error.status === 404);
  const errors: any = {
    code: error.code,
    name: error.name || error.type || ErrorsConst.REQUEST_ERRORS[error.status || '400'].name,
    message: verifyCustomerError ? error.message || ErrorsConst.RESPONSE_ERRORS[error.code]
      || Utils.strings.convertErrorCodeToMessage(error.code)
      || ErrorsConst.REQUEST_ERRORS[error.status || 400].message : ConstLib.ERROR_MESSAGE_DEFAULT_SYSTEM
  };
  const errorContent = error instanceof TypeError ? error.stack : error.errors || error.inner || error;
  if (ConfigBase.ENVIRONMENT !== Environment.production) {
    errors.errors = errorContent;
  }
  Logger.graylogHttp.commonResLog(Object.assign({}, errors, { errors: errorContent })
    , error.status || 400, _this)
    .catch(Logger.manual.addLog);
  return errors;
}

export default 'express/Response';
