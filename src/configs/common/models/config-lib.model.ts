import {Environment} from './common.model';

export interface ConfigBaseModel {
  ENVIRONMENT: string;

  // [SECURE-CONFIG] Security configuration ========================================================
  SECURE?: {
    JWT: {
      TOKEN_EXPIRE: number;
      JWT_SECRET: string;
      FIELD: string[]
    };
    API_RESTRICT?: {
      CLIENT_IDS?: string[];
      CLIENT_SECRET: string
    };
  };
  MICROSERVICE: {
    GATEWAY_CORE: string;
  };
  // Config Logging
  LOG_CONFIG?: {
    MICROSERVICE?: {
      ALLOW: boolean;
      // TODO add option config coming soon future (after finish service microservice-log "build in base-node")
    };
    GRAYLOG_HTTP?: {
      HOST: {
        DOMAIN: string;
        PORT: number;
        PREFIX: string;
      };
      SOURCES: string;
      FACILITIES: string;
      ALLOW: {
        HTTP: boolean;
        UDP: boolean;
        ENV: Environment[];
      };
    };
    GRAYLOG_UDP?: {
      HOST: {
        DOMAIN: string;
        PORT: number;
        PREFIX: string;
      };
      SOURCES: string;
      FACILITIES: string;
      ALLOW: {
        HTTP: boolean;
        UDP: boolean;
        ENV: Environment[];
      };
    };
    MANUAL?: {
      ALLOW: boolean;
    };
  };

  // config common ===================================================================================
  PAGE_SIZE: number;
}
