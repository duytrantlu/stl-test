import { IParamCommonList } from '../../configs/common/models';
import { OrderModel } from './order.model';


export interface IParamOrderCreate extends OrderModel {
}

export interface IParamOrderDetailById {
  customer: string;
  id: string;
}

export interface IParamOrderList extends IParamCommonList {
}

export interface IParamOrderCancel {
  customer: string;
  id: string;
}

export interface IParamOrderCheckStatus {
  customer: string;
  id: string;
}

export interface IParamOrderPayment {
  customer: string;
  id: string;
}