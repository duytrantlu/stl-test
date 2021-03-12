/// <reference types="express" />

declare namespace Express {
  export interface Request {
    user?: UserToken;
  }

  export interface UserToken {
    // primary info
    _id: string;
    role: string;
    email: string;
    // end
    iat: number;
    exp: number;
  }
}
