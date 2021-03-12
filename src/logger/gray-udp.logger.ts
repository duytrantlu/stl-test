import * as winston from 'winston';
import { ConfigBase } from '../configs/common/config.base';
import { LogLevel } from './loger.model';

const winstonGrayLogTwo = require('winston-graylog2');

export class GrayUdpLogger {
  // public static logger: winston.LoggerInstance =

  public static logger() {
    return new (winston.Logger)({
      transports: [
        new (winstonGrayLogTwo)({
          name: 'BicycleUdpLogging',
          level: LogLevel.info,
          silent: false,
          handleExceptions: false,
          prelog: function (msg: string) {
            return msg.trim();
          },
          graylog: {
            servers: [{
              host: ConfigBase.LOG_CONFIG.GRAYLOG_HTTP.HOST.DOMAIN,
              port: ConfigBase.LOG_CONFIG.GRAYLOG_HTTP.HOST.PORT
            }],
            hostname: ConfigBase.LOG_CONFIG.GRAYLOG_HTTP.SOURCES,
            facility: ConfigBase.LOG_CONFIG.GRAYLOG_HTTP.FACILITIES,
            bufferSize: 1400
          },
          staticMeta: {
            env: ConfigBase.ENVIRONMENT
          }
        })
      ]
    });
  }

  public static emergency(_message: string, _body: string) {
    GrayUdpLogger.logger().emerg(_message, _body);
  }

  public static alert(_message: string, _body: string) {
    GrayUdpLogger.logger().alert(_message, _body);
  }

  public static critical(_message: string, _body: string) {
    GrayUdpLogger.logger().crit(_message, _body);
  }

  public static error(_message: string, _body: string) {
    GrayUdpLogger.logger().error(_message, _body);
  }

  public static warning(_message: string, _body: string) {
    GrayUdpLogger.logger().warning(_message, _body);
  }

  public static notice(_message: string, _body: string) {
    GrayUdpLogger.logger().notice(_message, _body);
  }

  public static info(_message: string, _body: string) {
    GrayUdpLogger.logger().info(_message, _body);
  }

  public static debug(_message: string, _body: string) {
    GrayUdpLogger.logger().debug(_message, _body);
  }
}
