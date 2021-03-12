import { ModelUpdateOptions, QueryFindOneAndUpdateOptions } from 'mongoose';
import { PaginateParams } from './pagination';

export interface IParamCommonList {
  conditions: any;
  projections?: any;
  paginate?: PaginateParams;
}

export interface IParamCommonDetailByIdAndPopulate {
  id: string;
  projections?: any;
  populate: any;
}

export interface IParamCommonDetailByConditionAndPopulate {
  conditions: any;
  projections?: any;
  populate: any;
}

export interface IParamCommonFindByIdAndUpdate {
  id: string;
  data: any;
  options?: QueryFindOneAndUpdateOptions
}

export interface IParamCommonFindOneAndUpdate {
  conditions: any;
  data: any;
  options?: ModelUpdateOptions;
}

export interface IParamCommonUpdateOne {
  conditions: any;
  data: any;
  options?: ModelUpdateOptions;
}

export interface IParamCommonUpdateMany extends IParamCommonUpdateOne {
}
