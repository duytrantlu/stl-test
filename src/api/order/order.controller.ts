import * as moment from 'moment';
import { Request, Response } from 'express';

import { AppConst } from '../../common/consts/app.const';

import {
  IParamOrderList,
  IParamOrderCancel,
  IParamOrderCreate,
  IParamOrderPayment
} from './order.interface';
import { OrderService } from './order.service';
import { Utils } from '../../configs/common/utils';

const orderService = new OrderService();

export class OrderController {
  createOrder(req: Request, res: Response) {
    req.checkBody('productName')
      .notEmpty().withMessage(AppConst.PRODUCT_NAME_IS_REQUIRED);
    req.checkBody('price')
      .notEmpty().withMessage(AppConst.PRICE_IS_REQUIRED)
      .isNumeric().withMessage(AppConst.PRICE_INVALID);
    req.checkBody('quantity')
      .notEmpty().withMessage(AppConst.QUANTITY_IS_REQUIRED)
      .isNumeric().withMessage(AppConst.QUANTITY_INVALID)
      .isInt().withMessage(AppConst.QUANTITY_INVALID);
    const errors = req.validationErrors();
    if (errors) {
      return res.badParam(errors);
    }
    const { body } = req;
    const params = {
      customer: req.user._id,
      productName: body.productName,
      price: Utils.strings.roundNumber(Number(body.price)),
      quantity: Utils.strings.roundNumber(Number(body.quantity)),
      totalAmount: Utils.strings.roundNumber(Number(body.quantity) * Number(body.price))
    } as IParamOrderCreate;
    orderService.createOrder(params)
      .then(order => {
        return res.ok(order);
      })
      .catch(error => {
        return res.bad(error);
      });
  }

  listOrder(req: Request, res: Response) {
    const { query } = req;
    const conditions = {
      $and: [{ customer: req.user._id }] as any
    };
    if (query.startTime) {
      req.checkQuery('startTime')
        .isNumeric().withMessage(AppConst.ORDER_START_TIME_INVALID);
      conditions.$and.push({ createdDate: { $gte: moment.unix(Number(query.startTime)).toDate() } });
    }
    if (query.endTime) {
      req.checkQuery('endTime')
        .isNumeric().withMessage(AppConst.ORDER_END_TIME_INVALID);
      conditions.$and.push({ createdDate: { $lte: moment.unix(Number(query.endTime)).toDate() } });
    }
    if (query.status) {
      req.checkQuery('status')
        .notEmpty().withMessage(AppConst.ORDER_STATUS_IS_REQUIRED);
      conditions.$and.push({ status: { $in: query.status.split(',') } });
    }
    const errors = req.validationErrors();
    if (errors) {
      return res.badParam(errors);
    }
    const params: IParamOrderList = {
      conditions: conditions,
      paginate: query,
    };
    orderService.listOrder(params)
      .then(orders => {
        return res.ok(orders);
      })
      .catch(error => {
        return res.bad(error);
      });
  }

  detailOrderById(req: Request, res: Response) {
    req.checkParams('id')
      .notEmpty().withMessage(AppConst.COMMON_ID_IS_REQUIRED)
      .isMongoId().withMessage(AppConst.COMMON_ID_INVALID);
    const errors = req.validationErrors();
    if (errors) {
      return res.badParam(errors);
    }
    const params = {
      id: req.params.id,
      customer: req.user._id
    };
    orderService.detailOrderById(params)
      .then(order => {
        return res.ok(order);
      })
      .catch(error => {
        return res.bad(error);
      });
  }

  cancelOrder(req: Request, res: Response) {
    req.checkParams('id')
      .notEmpty().withMessage(AppConst.COMMON_ID_IS_REQUIRED)
      .isMongoId().withMessage(AppConst.COMMON_ID_INVALID);
    const errors = req.validationErrors();
    if (errors) {
      return res.badParam(errors);
    }
    const params = {
      customer: req.user._id,
      id: req.params.id
    } as IParamOrderCancel;
    orderService.cancelOrder(params)
      .then(order => {
        return res.ok(order);
      })
      .catch(error => {
        return res.bad(error);
      });
  }

  checkOrderStatus(req: Request, res: Response) {
    req.checkParams('id')
      .notEmpty().withMessage(AppConst.COMMON_ID_IS_REQUIRED)
      .isMongoId().withMessage(AppConst.COMMON_ID_INVALID);
    const errors = req.validationErrors();
    if (errors) {
      return res.badParam(errors);
    }
    const params = {
      customer: req.user._id,
      id: req.params.id
    } as IParamOrderCancel;
    orderService.checkOrderStatus(params)
      .then(order => {
        return res.ok(order);
      })
      .catch(error => {
        return res.bad(error);
      });
  }

  checkoutOrder(req: Request, res: Response) {
    req.checkBody('id')
      .notEmpty().withMessage(AppConst.COMMON_ID_IS_REQUIRED)
      .isMongoId().withMessage(AppConst.COMMON_ID_INVALID);
    const errors = req.validationErrors();
    if (errors) {
      return res.badParam(errors);
    }
    const params = {
      customer: req.user._id,
      id: req.body.id
    } as IParamOrderPayment;
    orderService.checkoutOrder(params)
      .then(order => {
        return res.ok(order);
      })
      .catch(error => {
        return res.bad(error);
      });
  }
}
