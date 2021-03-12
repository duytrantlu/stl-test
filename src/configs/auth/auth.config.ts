const USER_FIELD = ['_id', 'email'];

export class AuthConfig {
  static readonly JWT = {
    FIELD: [...USER_FIELD]
  };
}
