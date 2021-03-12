import {BaseError} from './base.error';
import {ErrorsConst} from '../error.const';

export class NotFoundError extends BaseError {
  constructor(options: { code?: string, error?: any, message?: string, name?: string } = {}) {
    options.code = options.code || ErrorsConst.REQUEST_ERRORS[404].code;
    super({error: options.error, code: options.code, message: options.message, status: 404, name: options.name});
  }
}
