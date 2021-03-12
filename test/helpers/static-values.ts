import {OrderModel} from '../../src/api/order/order.model';

export default {
  ORDERS: [],
  TOKEN: '',
  ORDER_ID_FAKE: '5f7efe4bf6e7ab6e361afa3e',
  GLOBAL: {}
} as StaticValues;


interface StaticValues {
  ORDERS: OrderModel[];
  TOKEN: string;
  ORDER_ID_FAKE: string;
  GLOBAL: any;
}
