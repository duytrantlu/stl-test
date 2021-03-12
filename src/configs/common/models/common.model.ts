/**
 * @class CommonModel
 * @description environment running, note (require environment nameming is lowercase)
 */
export enum Environment {
  local = 'local',
  production = 'production',
  staging = 'staging',
  dev = 'dev',
  test = 'test'
}

export enum RolesGroup {
  PARTNER = 'partner',
  ONLINE_STORE = 'online_store'
}

export enum DataType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean'
}

export enum Strategy {
  ClientId = 'x-setel-client-id',
  ClientSecret = 'x-setel-client-secret',
  ClientDevice = 'x-setel-device'
}

export enum ServiceOption {
  ORDER = 'order-service',
  PAYMENT = 'stl4-01-payment-service'
}

export enum Headers {
  ContentType = 'Content-Type',
  Authorization = 'Authorization'
}
