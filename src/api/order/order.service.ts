// const/config/model
import * as moment from 'moment';
import {
  IParamOrderList,
  IParamOrderCancel,
  IParamOrderCreate,
  IParamOrderDetailById,
  IParamOrderCheckStatus,
  IParamOrderPayment
} from './order.interface';
import { AppConst } from '../../common/consts/app.const';
import { AppObject } from '../../common/consts/app.object';
import { OrderRepository } from './order.repository';
import { ConflictError, NotFoundError, BaseError } from '../../configs/common/error';
import { paymentService } from '../../external-service';

const orderRepository = new OrderRepository();

export class OrderService {
  async createOrder(params: IParamOrderCreate) {
    return orderRepository
      .create(params);
  }

  async listOrder(params: IParamOrderList) {
    return orderRepository
      .list(params);
  }

  async detailOrderById(params: IParamOrderDetailById) {
    return orderRepository
      .detailByCondition({
        _id: params.id,
        customer: params.customer
      });
  }

  async cancelOrder(params: IParamOrderCancel) {
    const orderFound = await orderRepository
      .detailByCondition({
        _id: params.id,
        customer: params.customer
      });
    if (!orderFound) {
      throw new NotFoundError({ message: AppConst.ORDER_NOT_FOUND });
    }
    if (orderFound.status === AppObject.ORDER_STATUS.DELIVERED) {
      throw new ConflictError({ message: AppConst.ERROR_CANCEL });
    }
    orderFound.status = AppObject.ORDER_STATUS.CANCELLED;
    return orderFound.save();
  }

  async checkOrderStatus(params: IParamOrderCheckStatus) {
    const conditions: any = {
      _id: params.id,
      customer: params.customer
    };
    const orderFound = await orderRepository
      .detailByCondition(conditions);
    if (!orderFound) {
      throw new NotFoundError({ message: AppConst.ORDER_NOT_FOUND });
    }
    return { status: orderFound.status };
  }

  async checkoutOrder(params: IParamOrderPayment) {
    const order = await orderRepository
      .detailByCondition({
        _id: params.id,
        customer: params.customer
      });
    if (!order) {
      throw new NotFoundError({ message: AppConst.ORDER_NOT_FOUND });
    }
    if (order.status !== AppObject.ORDER_STATUS.CREATED) {
      throw new ConflictError({ message: AppConst.ERROR_UNABLE_EXECUTE_PAYMENT });
    }
    const paymentCheckout = await paymentService
      .checkoutOrder({
        customer: params.customer,
        orderId: params.id,
        currency: order.currency,
        totalAmount: order.totalAmount
      });
    order.paymentId = paymentCheckout._id;
    order.status = paymentCheckout.status === AppObject.ORDER_STATUS.CONFIRMED ? AppObject.ORDER_STATUS.CONFIRMED : AppObject.ORDER_STATUS.CANCELLED;
    await order.save();
    if (paymentCheckout.status !== AppObject.ORDER_STATUS.CONFIRMED) {
      throw new BaseError({ message: AppConst.ERROR_PAYMENT_IS_REJECTED });
    }
    return { message: AppConst.PAYMENT_COMPLETED };
  }

  async deliveryOrder() {
    return orderRepository.updateMany({
      conditions: {
        status: AppObject.ORDER_STATUS.CONFIRMED,
        updatedDate: { $lte: moment().toDate() }
      },
      data: {
        $set: { status: AppObject.ORDER_STATUS.DELIVERED }
      }
    });
  }
}