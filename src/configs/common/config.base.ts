import { merge } from 'lodash';
import { ConfigBaseModel, Environment } from './models';
import { SetupConfigLib } from '../base.config';

const defaultConfig: ConfigBaseModel = {
  ENVIRONMENT: Environment.local,

  // [SECURE-CONFIG] Security configuration ========================================================
  SECURE: {
    JWT: {
      TOKEN_EXPIRE: 0,
      JWT_SECRET: '',
      FIELD: ['_id', 'email'],
    },
    API_RESTRICT: {
      CLIENT_SECRET: ''
    }
  },
  MICROSERVICE: {
    GATEWAY_CORE: '',
  },
  // Config Logging default
  LOG_CONFIG: {
    MANUAL: {
      ALLOW: true
    },
    GRAYLOG_HTTP: {
      HOST: {
        DOMAIN: '',
        PORT: 12201,
        PREFIX: 'gelf'
      },
      SOURCES: '',
      FACILITIES: 'NODEJS',
      ALLOW: {
        HTTP: false,
        UDP: false,
        ENV: [Environment.staging, Environment.dev, Environment.production]
      }
    }
  },
  // config common ===================================================================================
  PAGE_SIZE: 20,
};

export const ConfigBase: ConfigBaseModel = merge(defaultConfig, SetupConfigLib);
