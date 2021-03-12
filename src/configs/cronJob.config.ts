import * as signale from 'signale';
import * as schedule from 'node-schedule';
import { default as AppConfig } from './app.config';
import { AppObject } from '../common/consts/app.object';
import { OrderService } from '../api/order/order.service';
import { Environment } from '../configs/common/models';

const orderService = new OrderService();

const scheduleUpdateStatusOrder = () => {
  // Recurrence Rule Scheduling
  let rule = new schedule.RecurrenceRule();
  rule.month = new schedule.Range(AppObject.SCHEDULE_OPTION.MONTH.START, AppObject.SCHEDULE_OPTION.MONTH.END);
  rule.dayOfWeek = new schedule.Range(AppObject.SCHEDULE_OPTION.DAY_OF_WEEK.START, AppObject.SCHEDULE_OPTION.DAY_OF_WEEK.END);
  rule.hour = new schedule.Range(AppObject.SCHEDULE_OPTION.HOUR.START, AppObject.SCHEDULE_OPTION.HOUR.END);
  rule.minute = new schedule.Range(AppObject.SCHEDULE_OPTION.MINUTE.START, AppObject.SCHEDULE_OPTION.MINUTE.END);
  rule.second = AppObject.SCHEDULE_OPTION.SECONDS;

  schedule.scheduleJob(rule, async () => {
    const statusDelivery = await orderService.deliveryOrder() as any;
    if (statusDelivery.nModified !== 0) {
      signale.complete(`Delivered success ${ statusDelivery.nModified } order.`);
    }
  });
};

export default function setUpJobSchedule() {
  if ([Environment.test].indexOf(AppConfig.ENV.NAME as Environment) === -1) {
    signale.start('Job schedule is started');
    scheduleUpdateStatusOrder();
  }
}