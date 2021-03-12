'use strict';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AppEnvironment } from '../../common/interfaces';

// config root
const ROOT = path.normalize(__dirname + '/../../..');
dotenv.config({path: ROOT + '/.env.local'});

export const ENV: AppEnvironment = {
  NAME: 'local',
  APP: {
    METHOD: 'http',
    HOST: '',
    PORT: 8080,
    IP: process.env['IP'] || '0.0.0.0'
  },
  GATEWAY_CONFIG: {
    METHOD: 'http',
    HOST: 'localhost:8081',
  },
  MICROSERVICE: {
    GATEWAY_CORE: ''
  },
  SECURE: {
    JWT: {
      JWT_SECRET: process.env.JWT_SECRET,
      /*time expire token*/
      TOKEN_EXPIRE: 7 * 24 * 60 * 60, // 7 days
    },
    API_RESTRICT: {
      CLIENT_SECRET: process.env.CLIENT_SECRET,
    }
  },
  DATABASE: {
    MONGODB: {
      USERNAME: process.env.MONGODB_USERNAME,
      PASSWORD: process.env.MONGODB_PASSWORD,
      HOST: process.env.MONGODB_HOST,
      PORT: process.env.MONGODB_PORT,
      NAME: process.env.MONGODB_NAME,
    },
  },
};
