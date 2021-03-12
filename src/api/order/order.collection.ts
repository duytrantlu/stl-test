import * as mongoose from 'mongoose';

import { AppKey } from '../../common/consts/app.key';
import { AppObject } from '../../common/consts/app.object';

import { OrderModel } from './order.model';

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customer: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: AppObject.ORDER_CURRENCY.USD,
    enum: Object.values(AppObject.ORDER_CURRENCY)
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentId: {
    type: String
  },
  deleted: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(AppObject.ORDER_STATUS),
    default: AppObject.ORDER_STATUS.CREATED
  }
}, AppObject.SCHEMA_OPTIONS);

export const Orders: mongoose.Model<OrderModel> = mongoose.model(AppKey.ORDER_COLLECTION, OrderSchema);
