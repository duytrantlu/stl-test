import * as sinon from 'sinon';
import { OrderRepository } from '../../src/api/order/order.repository';
import { RequestBuilder } from '../helpers/request-builder';
import StaticValues from '../helpers/static-values';
import { TestConst } from '../helpers/consts';
import { orderMock } from '../data/order/order.dat';
import { AppObject } from '../../src/common/consts/app.object';
import { paymentService } from '../../src/external-service';
import { beforeEach } from 'mocha';
import helperConsts from '../helpers/consts';
import {OrderService} from '../../src/api/order/order.service';
import { expect } from 'chai';

const orderRepository = new OrderRepository();
const orderService = new OrderService();
const req = new RequestBuilder('/orders');

const orderSchema = require('../schemas/order/order.schema.json');
const ordersSchema = require('../schemas/order/orders.schema.json');

describe('Order service', () => {
  let callFake: any;
  before(async () => {
    StaticValues.ORDERS = await orderRepository.createMultiple(orderMock);
  });
  beforeEach(async () => {
    callFake = sinon.stub(paymentService, "checkoutOrder");
  })
  afterEach(async () => {
    callFake.restore();
  });



  describe('Create an Order', () => {
    it('Should return error when name\'s product is missing in body', (done) => {
      const body = {
        'price': 10,
        'quantity': 3
      };
      req
        .post('/')
        .userAuth()
        .send(body)
        .expectStatus(TestConst.STATUS.UNPROCESSABLE_ENTITY)
        .end(done);
    });
    it('Should return error when price is missing in body', (done) => {
      const body = {
        'productName': 'bread',
        'quantity': 1
      };
      req
        .post('/')
        .userAuth()
        .send(body)
        .expectStatus(TestConst.STATUS.UNPROCESSABLE_ENTITY)
        .end(done);
    });
    it('Should return error when quantity is missing in body', (done) => {
      const body = {
        'productName': 'bread',
        'price': 200
      };
      req
        .post('/')
        .userAuth()
        .send(body)
        .expectStatus(TestConst.STATUS.UNPROCESSABLE_ENTITY)
        .end(done);
    });
    it('Should create an order successfully', (done) => {
      const body = {
        'productName': 'Bike2020',
        'price': 200,
        'quantity': 2,
        'totalAmount': 400
      }
      req
        .post('/')
        .userAuth()
        .send(body)
        .setValue([{ orderId: '_id' }])
        .expectStatus(TestConst.STATUS.SUCCESS)
        .expectSchema(orderSchema)
        .end(done);
    });
  });

  describe('Get order', () => {
    it('Should return a list of order', (done) => {
      req
        .get('/')
        .userAuth()
        .expectStatus(TestConst.STATUS.SUCCESS)
        .expectSchema(ordersSchema)
        .end(done);
    });

    it('Should return a list of order with query param', (done) => {
      const query = {
        startTime: 1603183865,
        endTime: 1603183865,
        status: 'created'
      }
      req
        .get('/')
        .userAuth()
        .query(query)
        .expectStatus(TestConst.STATUS.SUCCESS)
        .expectSchema(ordersSchema)
        .end(done);
    });

    it('Should return error when query get list order invalid', (done) => {
      const query = {
        startTime: 'string',
        endTime: 'string',
        status: ''
      }
      req
        .get('/')
        .userAuth()
        .query(query)
        .expectStatus(TestConst.STATUS.UNPROCESSABLE_ENTITY)
        .expectSchema(ordersSchema)
        .end(done);
    });

    it('Should return detail of an order', (done) => {
      req
        .get(`/${ StaticValues.GLOBAL['orderId'] }`)
        .userAuth()
        .expectStatus(TestConst.STATUS.SUCCESS)
        .expectSchema(orderSchema)
        .end(done);
    });

    it('Should return error when param invalid', (done) => {
      req
        .get(`/123`)
        .userAuth()
        .expectStatus(TestConst.STATUS.UNPROCESSABLE_ENTITY)
        .end(done);
    });
  });

  describe('Cancel an order', () => {
    it('Should return error when Order not Found', (done) => {
      req
        .patch(`/${ StaticValues.ORDER_ID_FAKE }/cancel`)
        .userAuth()
        .expectStatus(TestConst.STATUS.NOT_FOUND)
        .end(done);
    });

    it('Should return error OrderId invalid', (done) => {
      req
        .patch('/123/cancel')
        .userAuth()
        .expectStatus(TestConst.STATUS.UNPROCESSABLE_ENTITY)
        .end(done);
    });

    it('Should return error when trying cancel order is currently delivered in status', (done) => {
      const orderWithStatusDelivered = StaticValues.ORDERS.find(order => order.status === AppObject.ORDER_STATUS.DELIVERED);
      req
        .patch(`/${ orderWithStatusDelivered._id.toString() }/cancel`)
        .userAuth()
        .expectStatus(TestConst.STATUS.CONFLICT)
        .end(done);
    });

    it('Should cancel order successfully', (done) => {
      const orderWithStatusCreated = StaticValues.ORDERS.find(order => order.status === AppObject.ORDER_STATUS.CREATED);
      req
        .patch(`/${ orderWithStatusCreated._id.toString() }/cancel`)
        .userAuth()
        .expectStatus(TestConst.STATUS.SUCCESS)
        .expectSchema(ordersSchema)
        .end(done);
    });
  });

  describe('Check order\'s status', () => {
    it('Should return status of order', (done) => {
      const orderWithStatusCanceled = StaticValues.ORDERS.find(order => order.status === AppObject.ORDER_STATUS.CANCELLED);
      req
        .post(`/${ orderWithStatusCanceled._id.toString() }/check-status`)
        .userAuth()
        .expectStatus(TestConst.STATUS.SUCCESS)
        .expectSchema({
          'status': /.*/
        })
        .end(done);
    });

    it('Should return error when order not found', (done) => {
      req
        .post(`/${ StaticValues.ORDER_ID_FAKE }/check-status`)
        .userAuth()
        .expectStatus(TestConst.STATUS.NOT_FOUND)
        .expectSchema({
          'status': /.*/
        })
        .end(done);
    });

    it('Should return error when orderId invalid in param', (done) => {
      req
        .post(`/123/check-status`)
        .userAuth()
        .expectStatus(TestConst.STATUS.UNPROCESSABLE_ENTITY)
        .expectSchema({
          'status': /.*/
        })
        .end(done);
    });
  });

  describe('Checkout Order', () => {
    it('Should return error when orderId is missing in body', (done) => {
      const body = {
        'productName': 'bread',
        'quantity': 1
      };
      req
        .post('/checkout')
        .userAuth()
        .send(body)
        .expectStatus(TestConst.STATUS.UNPROCESSABLE_ENTITY)
        .end(done);
    });

    it('Should return error when order not found', (done) => {
      const body = {
        id: StaticValues.ORDER_ID_FAKE
      };
      req
        .post('/checkout')
        .userAuth()
        .send(body)
        .expectStatus(TestConst.STATUS.NOT_FOUND)
        .end(done);
    });

    it('Should return error when trying checkout order currently have status is not created', (done) => {
      const orderWithStatusDelivered = StaticValues.ORDERS.find(order => order.status === AppObject.ORDER_STATUS.DELIVERED);
      const body = {
        id: orderWithStatusDelivered._id
      };
      req
        .post('/checkout')
        .userAuth()
        .send(body)
        .expectStatus(TestConst.STATUS.CONFLICT)
        .end(done);
    });

    it('Should return error when payment checkout was cancelled', (done) => {
      const orderWithStatusDelivered = StaticValues.ORDERS.find(order => (order.status === AppObject.ORDER_STATUS.CREATED) && (order.productName === helperConsts.EXT_NAME_PRODUCT_DECLINED));
      const body = {
        id: orderWithStatusDelivered._id
      };
      callFake.returns(new Promise((resolve) => resolve({
        _id: 'string',
        customer: 'string',
        totalAmount: 10,
        currency: 'string',
        status: 'cancelled',
        deleted: false,
        createdDate: new Date(),
        updatedDate: new Date(),
      })));
      req
        .post('/checkout')
        .userAuth()
        .send(body)
        .expectStatus(TestConst.STATUS.BAD)
        .end(done);
    });

    it('Should checkout order successfully with status confirmed', (done) => {
      const orderWithStatusDelivered = StaticValues.ORDERS.find(order => (order.status === AppObject.ORDER_STATUS.CREATED) && (order.productName === helperConsts.EXT_NAME_PRODUCT_CONFIRMED));
      const body = {
        id: orderWithStatusDelivered._id
      };
      callFake.returns(new Promise((resolve) => resolve({
        _id: 'string',
        customer: 'string',
        totalAmount: 101,
        currency: 'string',
        status: 'confirmed',
        deleted: false,
        createdDate: new Date(),
        updatedDate: new Date(),
      })));
      req
        .post('/checkout')
        .userAuth()
        .send(body)
        .expectStatus(TestConst.STATUS.SUCCESS)
        .end(done);
    });
  });

  describe('Delevery Order', () => {
    it('Should update order\'s status successfully', async () => {
      const result = await orderService.deliveryOrder();
      expect(result.nModified).to.be.greaterThan(0);
    })
  })
});
