import {AppObject} from '../../../src/common/consts/app.object';
import {OrderModel} from '../../../src/api/order/order.model';

const customer = {
  _id: '5f76f8e02a5f1f3f4f191fc7'
};
export const orderMock = [
  {
    customer: customer._id,
    productName: 'p1',
    price: 1,
    quantity: 1,
    totalAmount: 1,
    status: AppObject.ORDER_STATUS.CREATED
  },
  {
    customer: customer._id,
    productName: 'p2',
    price: 2,
    quantity: 2,
    totalAmount: 4,
    status: AppObject.ORDER_STATUS.DELIVERED
  },
  {
    customer: customer._id,
    productName: 'p3',
    price: 3,
    quantity: 3,
    totalAmount: 9,
    status: AppObject.ORDER_STATUS.CANCELLED
  },
  {
    customer: customer._id,
    productName: 'p7',
    price: 3,
    quantity: 3,
    totalAmount: 9,
    status: AppObject.ORDER_STATUS.CONFIRMED
  },
  {
    customer: customer._id,
    productName: 'p4',
    price: 4,
    quantity: 4,
    totalAmount: 16,
    status: AppObject.ORDER_STATUS.CREATED
  },
  {
    customer: customer._id,
    productName: 'name_for_declined_checkout',
    price: 5,
    quantity: 5,
    totalAmount: 25,
    status: AppObject.ORDER_STATUS.CREATED,
  },
  {
    customer: customer._id,
    productName: 'name_for_confirmed_checkout',
    price: 6,
    quantity: 6,
    totalAmount: 36,
    status: AppObject.ORDER_STATUS.CREATED,
  }
] as OrderModel[];