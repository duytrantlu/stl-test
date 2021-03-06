/**
 * @module util
 * @author DuyTM
 * @description util service
 */
import * as express from 'express';
import {ErrorsConst} from './error.const';
import {BaseError} from './http-method';

/**
 * @method validationParamError
 * @description validate param in validator
 * @param {e.Response} res
 * @param errors
 * @return {Response}
 */
export function validationParamErrorBasic(res: express.Response, errors: any) {
  const messageTemp = Object.values<{ message: string }>(errors['errors']);
  return res.json({
    code: ErrorsConst.REQUEST_ERRORS[422].code,
    status: 422,
    message: messageTemp[0].message,
    error: errors['errors']
  });
}

/**
 * @method validationParamError
 * @description validate param error from req validator
 * @deprecated Please using res.badParam(errors) replace
 * @param res
 * @param errors
 */
export function validationParamError(res: express.Response, errors: any) {
  return res.bad({
    code: ErrorsConst.REQUEST_ERRORS[422].code,
    status: 422,
    message: Object.values<{ msg: string }>(errors)[0].msg,
    errors: errors
  });
}

export function controllerTransformError(cb?: any) {
  return function (err: any) {
    console.error(`Controller catch info: `, err.message);
    if (cb) return cb(err);
  };
}

export function vmoCoreErrorHandler(error: any) {
  const _error = error.error ? error.error : error;
  throw new BaseError({error: _error});
}

export function serviceTransformError(callback?: Function | { cb?: Function, service?: string }) {
  return function (err: any) {
    const serviceName = String((callback as any).service || 'Unknown').toUpperCase();
    console.error(`Service "${serviceName}" catch info: `, err.message);
    if (callback) return (callback as Function)(err);
    if ((callback as any).cb) return (callback as any).cb(err);
  };
}
