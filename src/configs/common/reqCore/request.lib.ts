/**
 * @author DuyTM
 * @description custom request internal service
 * @version 1.0
 * @since 2018/05/22
 */

import * as _ from 'lodash';
import * as request from 'request';
import * as requestPromise from 'request-promise';

import {ConfigBase} from '../config.base';
import {MethodOption, OptionRequest, Strategy} from '../models';

export class Request {
  public _request: request.RequestAPI<requestPromise.RequestPromise,
    requestPromise.RequestPromiseOptions, request.RequiredUriUrl>;
  public _optionBase: any = {};
  public _apiGateway = ConfigBase.MICROSERVICE.GATEWAY_CORE;

  /**
   * @constructor RequestLib
   * @param headersSecure
   */
  constructor(headersSecure: any = {[Strategy.ClientSecret]: ConfigBase.SECURE.API_RESTRICT.CLIENT_SECRET}) {
    this._request = requestPromise;
    this._optionBase = {
      headers: {
        'Content-Type': 'application/json',
      },
      json: true,
      qs: {
        env: ConfigBase.ENVIRONMENT
      }
    };
    if (headersSecure) {
      Object.keys(headersSecure).forEach(key => {
        this._optionBase.headers[key] = headersSecure[key];
      });
    }
  }

  set optionBase(__optionBase: any) {
    this._optionBase = __optionBase;
  }

  get optionBase() {
    return this._optionBase;
  }

  set apiGateway(__apiGateway: string) {
    this._apiGateway = __apiGateway;
  }

  get apiGateway() {
    return this._apiGateway;
  }

  /**
   * @method mergeOption
   * @description merge option request
   * @param options
   * @param method
   */
  public mergeOption(options: OptionRequest, method: MethodOption) {
    this._optionBase.method = method;
    return _.omitBy(Object.assign({}, this._optionBase, {
      method: method,
      url: `${this._apiGateway}/${options.service}/${options.url}`,
      body: options.body,
      qs: Object.assign(this._optionBase.qs, options.qs)
    }), _.isNil) as any;
  }

  /**
   * @method post
   * @param {OptionRequest} options
   * @return {requestPromise.RequestPromise}
   * @example
   {
      service: ServiceOption.NOTIFY;
      url: 'mail/send';
      body: {
        page:1
      }
   }
   */
  public post(options: OptionRequest) {
    const newOption = this.mergeOption(options, MethodOption.POST);
    return this._request(newOption);
  }
}
