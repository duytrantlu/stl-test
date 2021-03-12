/**
 * @author DuyTM
 * @description routing config project
 * @version 1.0
 * @since 2018/05/25
 */

import * as express from 'express';

import { ApiOption } from '../models';
import { BasicAuthLib } from '../../auth';

let _router = express.Router();

export class RoutingLib {
  /**
   * @method get
   * @description custom router get from express
   * @param {string} path
   * @param fn
   * @param {ApiOption} options
   */
  public static get(path: string, fn: any, options?: ApiOption) {
    RoutingLib.route('get', path, fn, options);
  }

  /**
   * @description custom router method get from express
   * @param {string} path
   * @param fn
   * @param {ApiOption} options
   */
  public static post(path: string, fn: any, options?: ApiOption) {
    RoutingLib.route('post', path, fn, options);
  }

  /**
   * @method put
   * @description custom router method post from express
   * @param {string} path
   * @param fn
   * @param {ApiOption} options
   */
  public static put(path: string, fn: any, options?: ApiOption) {
    RoutingLib.route('put', path, fn, options);
  }

  /**
   * @method patch
   * @description custom router method patch from express
   * @param {string} path
   * @param fn
   * @param {ApiOption} options
   */
  public static patch(path: string, fn: any, options?: ApiOption) {
    RoutingLib.route('patch', path, fn, options);
  }

  /**
   * @method delete
   * @description custom router method delete from express
   * @param {string} path
   * @param fn
   * @param {ApiOption} options
   * @private
   */
  public static delete(path: string, fn: any, options?: ApiOption) {
    RoutingLib.route('delete', path, fn, options);
  }

  /**
   * @method route
   * @description custom router handler by pass to middleware
   * @param {String}      method                      Route method
   * @param {String}      path                        Route path
   * @param {Function[]}  fn                          Functions
   * @param {Object}      options                     Route options
   */
  private static route(method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string, fn: any, options?: ApiOption) {
    if (!Array.isArray(fn)) {
      fn = [fn];
    }
    if (!options) {
      options = {
        allowAnonymous: false
      };
    }
    if (options.allowAnonymous !== true) {
      fn.unshift(BasicAuthLib.verifyToken(options));
    } else {
      fn.unshift(BasicAuthLib.verifyTokenBase);
    }
    _router[method](path, fn);
  }
}

export const route = _router;
