import * as signale from 'signale';
import { BaseError } from '../configs/common/error';
import { ConfigBase } from '../configs/common/config.base';

export class ManualLogger {
  /**
   * @method enable
   * @description set receive log is enable or disable
   * @param {boolean} _status if status = [false => disable log], [true => enable log]
   */
  public static config(_status: boolean = true) {
    if (_status) {
      signale.warn('[LOGGER] type "manual" is enable. The production is not recommended to display log manual status');
      ConfigBase.LOG_CONFIG.MANUAL.ALLOW = _status;
    } else {
      signale.warn('[LOGGER] type "manual" is disable.');
      ConfigBase.LOG_CONFIG.MANUAL.ALLOW = false;
    }
  }

  public static addLog(error: BaseError) {
    if (ConfigBase.LOG_CONFIG.MANUAL.ALLOW) {
      signale.error('[ERROR] Internal Error');
      signale.error(error);
    }
  }
}
