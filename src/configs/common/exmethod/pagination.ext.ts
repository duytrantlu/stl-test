/**
 * @description pagination extension
 * @ref https://github.com/enkidevs/mongoose-cursor-pagination/blob/master/src/index.js
 */

import * as async from 'async';
import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';
import {merge, omitBy, isNil} from 'lodash';

import {ConstLib} from '../consts';
import {Utils} from '../utils';
import {PaginateParams, Pagination} from '../models';

const btoa = require('btoa');
const atob = require('atob');

/**
 * @method paginate
 * @param {PaginateParams} params
 * @param {(err: any, data: PaginationNew<Document[]>) => void} callback
 * @return {Bluebird<Pagination<Document[]>>}
 * @example
 {
      sort: _id:1;name:1;address:-1,
      page: number,
      pageSize: number,
      select: name:0;email:1,
      populations: account:name address,
      where: role:wholesaler;status.active.is_active:1,
      pattern: email:abc@gmail.com;
   }
 */
mongoose.Query.prototype.paginate = function (params: PaginateParams = {}, callback?: (err: any, data: Pagination<Document[]>) => void): Promise<Pagination<Document[]>> {
  params = !params ? {} : params;
  return new Promise<Pagination<Document[]>>((resolve, reject) => {
    if (!params) {
      params = {} as PaginateParams;
    }
    params.page = +params.page || 1;
    params.pageSize = +params.pageSize || ConstLib.PAGE_SIZE;

    let queryDocs: mongoose.Query<any> = this as any;

    //#region where & pattern
    const _where: any = {};
    if (params.where) {
      const whereValues: string[] = params.where.split(';');
      whereValues.forEach((wv: string) => {
        const value: string[] = wv.split(':');
        _where[value[0]] = value[1] || undefined;
      });
    }
    if (params.pattern) {
      const patternValues: string[] = params.pattern.split(';');
      patternValues.forEach((pv: string) => {
        const value: string[] = pv.split(':');
        _where[value[0]] = new RegExp(value[1]) || undefined;
      });
    }
    // security => priority query condition from _condition > _where
    const endConditionWhereOrPattern = Utils.objects.camelCase(omitBy(merge(_where, this._conditions), isNil));
    queryDocs.find(endConditionWhereOrPattern);
    //#endregion

    // verify query sort - value is [1] or [-1] -----------------------------------------
    if (params.sort) {
      const sort: any = {};
      const sortValues: string[] = params.sort.split(';');
      sortValues.forEach((sv: string) => {
        const value: string[] = sv.split(':');
        sort[value[0]] = +(value[1] || 1);
      });
      queryDocs.sort(Utils.objects.camelCase(sort));
    }

    // verify query select - value is [0] or [1] ---------------------------------------
    if (params.select) {
      const select: any = {};
      const selectValues: string[] = params.select.split(';');
      selectValues.forEach((sv: string) => {
        const value: string[] = sv.split(':');
        select[value[0]] = +(value[1] || 1);
      });
      queryDocs.select(Utils.objects.camelCase(select));
    }

    // verify pageSize
    if (params.pageSize !== -1) {
      queryDocs = queryDocs
        .skip((params.page - 1) * params.pageSize)
        .limit(params.pageSize);
    }

    // population ----------------------------------------------------------------------
    if (params.populations) {
      const populate: any[] = [];
      const pops: string[] = params.populations.split(';');
      pops.forEach((popEle: string) => {
        const value: string[] = popEle.split(':');
        populate.push({
          path: Utils.strings.camelCase(value[0]),
          select: value[1]
        });
      });
      queryDocs.populate(populate);
    }
    const queryCount = (this as any).model.countDocuments((this as any)._conditions || params.where);
    async.parallel({
      data: (cb: Function) => queryDocs.exec(cb),
      totalItem: (cb: Function) => queryCount.exec(cb)
    }, (err: any, data: any) => {
      if (err) return reject(err);
      let result: Pagination<Document[]>;
      if (!err && data) {
        result = <Pagination<Document[]>>data;
        result.page = params.page;
        result.pageSize = params.pageSize === -1 ? result.data.length : params.pageSize;
        result.totalPage = Math.ceil(result.totalItem / (result.pageSize || 1));
      }
      resolve(result);
    });
  })
    .nodeify(callback);
};

export default 'mongoose/Query';
