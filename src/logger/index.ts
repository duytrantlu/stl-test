import {GrayHttpLogger} from './gray-http.logger';
import {GrayUdpLogger} from './gray-udp.logger';
import {ManualLogger} from './manual.logger';

export class Logger {
  public static manual = ManualLogger;
  public static graylogHttp = GrayHttpLogger;
  public static graylogUdp = GrayUdpLogger;
}
