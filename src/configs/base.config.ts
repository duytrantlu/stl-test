import APP_CONFIG from './app.config';

import { AppConst } from '../common/consts/app.const';
import { ConfigBaseModel } from './common';

export const SetupConfigLib: ConfigBaseModel = {
  ENVIRONMENT: APP_CONFIG.ENV.NAME,

  SECURE: {
    JWT: {
      TOKEN_EXPIRE: APP_CONFIG.ENV.SECURE.JWT.TOKEN_EXPIRE,
      JWT_SECRET: APP_CONFIG.ENV.SECURE.JWT.JWT_SECRET,
      FIELD: ['_id', 'role', 'email', 'display_name']
    },
    API_RESTRICT: {
      CLIENT_SECRET: APP_CONFIG.ENV.SECURE.API_RESTRICT.CLIENT_SECRET
    }
  },
  MICROSERVICE: {
    GATEWAY_CORE: `${APP_CONFIG.ENV.GATEWAY_CONFIG.METHOD}://${APP_CONFIG.ENV.GATEWAY_CONFIG.HOST}`,
  },
  // config common ===================================================================================
  PAGE_SIZE: AppConst.PAGE_SIZE,
  LOG_CONFIG: {
    MANUAL: {
      ALLOW: true
    }
  },
};
