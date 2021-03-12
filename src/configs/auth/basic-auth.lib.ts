/**
 * @module auth
 * @author DuyTM
 * @description basic authenticate library
 * @version 1.0.0
 */

import * as jwt from 'jsonwebtoken';
import { pick, omitBy, isNil } from 'lodash';
import { Request, Response, NextFunction, RequestHandler } from 'express';

import { AuthConfig } from './auth.config';
import { ConstLib } from '../common/consts';
import { Strategy, ApiOption } from '../common/models';
import { expressJwt } from './';

import { ConfigBase } from '../common/config.base';

export default class BasicAuthLib {
  /**
 * @method verifyToken
 * @description Check if token is valid
 * @param options
 * @return {e.RequestHandler}
 */
  public static verifyToken(options?: ApiOption & any): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
      return expressJwt.handler(Object.assign({}, options, {
        secret: ConfigBase.SECURE.JWT.JWT_SECRET
      }))(req, res, next);
    };
  }

  /**
   * @method verifyTokenBase
   * @description same as verifyToken. But function not attach response failed when token not invalid
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {e.NextFunction} next
   * @return {e.RequestHandler}
   */
  public static verifyTokenBase(req: Request, res: Response, next: NextFunction): void {
    const clientSecret: string = <string>req.headers[Strategy.ClientSecret];
    if (clientSecret && clientSecret.length >= 71 && ConfigBase.SECURE.API_RESTRICT.CLIENT_SECRET.indexOf(clientSecret) > -1) {
      return next();
    }
    let token: string = <string>req.headers.authorization;
    jwt.verify(token ? token.substring(7) : '', ConfigBase.SECURE.JWT.JWT_SECRET,
      { algorithms: ['HS512'] }, function (err, decoded) {
        if (err) return next();
        req.user = decoded as any;
        return next();
      });
  }

  /**
   * @method signToken
   * @description create new token
   * @param {object} user
   * @param {string[]} fields
   * @param {number} expiresIn
   * @return {string}
   */
  public static signToken(
    user: any
    , fields: string[] = [
      ...AuthConfig.JWT.FIELD,
    ]
    , expiresIn: number = ConfigBase.SECURE.JWT.TOKEN_EXPIRE) {
    user = omitBy(user, isNil);
    return jwt.sign(
      pick(user, fields),
      ConfigBase.SECURE.JWT.JWT_SECRET,
      {
        algorithm: ConstLib.JWT_SECRET_ALGORITHM,
        expiresIn: expiresIn
      }
    );
  }
}
