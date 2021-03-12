/**
 * @author DuyTM
 * @module Logger
 * @description logger http module
 * config =>
 *  - emerg: 0, // <=> emergency
 *  - alert: 1,
 *  - crit: 2,  // <=> critical
 *  - error: 3,
 *  - warning: 4,
 *  - notice: 5,
 *  - info: 6,
 *  - debug: 7
 * @deprecated on future using serviceLogger replace (coming soon go live in 2020)
 * */


import * as signale from 'signale';
import * as request from 'request-promise';

import {
  LogFull,
  LogLevel,
  LogShort,

} from './loger.model';
import {
  Environment,
  MethodOption,
  ServiceOption
} from '../configs/common/models';
import { ConstLib } from '../configs/common/consts';

import { ConfigBase } from '../configs/common/config.base';
import { Utils } from '../configs/common/utils';

export class GrayHttpLogger {
  /**
   * @method enable
   * @description set receive log is enable or disable
   * @param {boolean} _status if status = [false => disable log], [true => enable log]
   */
  public static config(_status: boolean = true) {
    if ([Environment.staging, Environment.dev, Environment.production]
      .indexOf(ConfigBase.ENVIRONMENT as Environment) > -1 && _status) {
      signale.success('[LOGGER] type "gray-http" is enable.');
      ConfigBase.LOG_CONFIG.GRAYLOG_HTTP.ALLOW.HTTP = _status;
    } else {
      signale.warn(ConstLib.LOGGER_GRAY_HTTP_WARNING);
      ConfigBase.LOG_CONFIG.GRAYLOG_HTTP.ALLOW.HTTP = false;
    }
  }

  /**
   * @method logger
   * @description log config
   * @param _body
   */
  public static async logger(_body: LogShort) {
    if (String(ConfigBase.LOG_CONFIG.GRAYLOG_HTTP.ALLOW.HTTP) === ConstLib.BOOLEAN.FALSE
      || ConfigBase.LOG_CONFIG.GRAYLOG_HTTP.ALLOW.ENV.indexOf(ConfigBase.ENVIRONMENT as Environment) === -1) {
      return;
    }
    const defaultBody: LogFull = {
      env: ConfigBase.ENVIRONMENT,
      facility: ConfigBase.LOG_CONFIG.GRAYLOG_HTTP.FACILITIES,
      host: ConfigBase.LOG_CONFIG.GRAYLOG_HTTP.SOURCES,
      shortMessage: 'default short message',
      level: LogLevel.info,
      path: 'https?://default_api',
      status: 400,
      rawData: {
        method: '',
        body: {},
        query: {}
      },
      rawHeaders: {
        ip: '',
        userAgent: '',
      },
      rawResponse: {}
    };
    const options = {
      method: MethodOption.POST,
      url: `http://${ ConfigBase.LOG_CONFIG.GRAYLOG_HTTP.HOST.DOMAIN }:${ ConfigBase.LOG_CONFIG.GRAYLOG_HTTP.HOST.PORT }`
        + `/${ ConfigBase.LOG_CONFIG.GRAYLOG_HTTP.HOST.PREFIX }`,
      headers: {
        'Content-Type': 'application/json',
      },
      json: true,
      body: Object.assign(defaultBody, _body)
    };
    return request(options);
  }

  public static async commonResLog(
    _errors: { name?: string, code: string, message: string, errors: any },
    _status: number, _this: any) {
    const body: LogShort = {
      shortMessage: _errors.message,
      path: _this.req.originalUrl,
      status: _status,
      rawData: {
        method: _this.req.method,
        body: _this.req.body,
        query: _this.req.query
      },
      rawHeaders: {
        ip: _this.req.headers['x-forwarded-for'] || _this.req.connection.remoteAddress
          || _this.req.socket.remoteAddress
          || (_this.req.connection.socket ? _this.req.connection.socket.remoteAddress : undefined),
        userAgent: _this.req.headers['user-agent']
      },
      rawResponse: _errors
    };
    if (_status < 400) {
      return await GrayHttpLogger.info(body);
    } else if (_status >= 500) {
      return await GrayHttpLogger.emergency(body);
    } else if (_status >= 400) {
      if (_status === 400) return await GrayHttpLogger.error(body);
      else if (_status === 401) return {}; // no send error
      else if (_status === 403) return await GrayHttpLogger.warning(body);
      else if (_status === 409) return await GrayHttpLogger.critical(body);
    }
  }

  public static async commonHandler(
    _errors: { name?: string, code: string, message: string, errors: any },
    functionName: string, level: LogLevel = LogLevel.error) {
    const body: LogShort = {
      shortMessage: _errors.message,
      path: `http://${ ServiceOption.ORDER }/function`,
      // status: _status,
      rawData: {
        body: `[FUNCTION-ERROR]: ${ functionName }`,
        query: {}
      },
      rawHeaders: {
        ip: 'current-ip-service',
        userAgent: 'not-available'
      },
      rawResponse: _errors,
      level
    };
    return await GrayHttpLogger.logger(Utils.objects.snakeCase(body));
  }

  public static async emergency(_body: LogShort) {
    _body.level = LogLevel.emergency;
    return await GrayHttpLogger.logger(_body);
  }

  public static async alert(_body: LogShort) {
    _body.level = LogLevel.alert;
    return await GrayHttpLogger.logger(_body);
  }

  public static async critical(_body: LogShort) {
    _body.level = LogLevel.critical;
    return await GrayHttpLogger.logger(_body);
  }

  public static async error(_body: LogShort) {
    _body.level = LogLevel.error;
    return await GrayHttpLogger.logger(_body);
  }

  public static async warning(_body: LogShort) {
    _body.level = LogLevel.warning;
    return await GrayHttpLogger.logger(_body);
  }

  public static async notice(_body: LogShort) {
    _body.level = LogLevel.notice;
    return await GrayHttpLogger.logger(_body);
  }

  public static async info(_body: LogShort) {
    _body.level = LogLevel.info;
    return await GrayHttpLogger.logger(_body);
  }

  public static async debug(_body: LogShort) {
    _body.level = LogLevel.debug;
    return await GrayHttpLogger.logger(_body);
  }
}
