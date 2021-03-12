/**
 * @author DuyTM
 * @interface AppEnvironment
 * @since 2018/03/21
 */

export interface AppEnvironment {
  NAME: string;
  APP: {
    METHOD: string;
    HOST: string;
    PORT: number;
    IP: string;
  };
  MICROSERVICE: {
    GATEWAY_CORE: string;
  };
  SECURE: {
    JWT: {
      JWT_SECRET: string;
      TOKEN_EXPIRE: number;
    };
    API_RESTRICT: {
      CLIENT_SECRET: string;
    };
  };
  DATABASE: {
    MONGODB: {
      USERNAME: string;
      PASSWORD: string;
      HOST: string;
      PORT: number | string;
      NAME: string;
    }
  };
  GATEWAY_CONFIG: {
    METHOD: string;
    HOST: string;
  }
}
