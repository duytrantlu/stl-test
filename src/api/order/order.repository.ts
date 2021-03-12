import { OrderModel } from './order.model';
import { Orders } from './order.collection';

import { MongooseRepository } from '../../configs/database/mongoose';

export class OrderRepository extends MongooseRepository<OrderModel> {
  constructor() {
    super(Orders);
  }
}
