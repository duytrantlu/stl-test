import * as path from 'path';
import * as jwt from 'jsonwebtoken';

export function normalizePath(input: string) {
  return path.normalize(input);
}

export function stringifyQueryParams(params: string | { [field: string]: number | string | boolean }): string {
  let output: string = '';
  if (!params) {
    return '';
  }
  if ('string' === typeof params) {
    return params.replace(/\?{2,}/g, '?');
  }
  if ('object' === typeof params) {
    for (let k in params) {
      output += `&${k}=${params[k]}`;
    }
  }
  return `?${output.substring(1)}`;
}

export function decodeToken(token: string) {
  return jwt.decode(token.substring(7)) as any;
}
