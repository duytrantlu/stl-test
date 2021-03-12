import { router } from '../../configs/common/routingCore';
import { OrderController } from './order.controller';

const orderCtrl = new OrderController();

router.post('/orders', orderCtrl.createOrder);
router.get('/orders', orderCtrl.listOrder);
router.get('/orders/:id', orderCtrl.detailOrderById);
router.patch('/orders/:id/cancel', orderCtrl.cancelOrder);
router.post('/orders/:id/check-status', orderCtrl.checkOrderStatus);
router.post('/orders/checkout', orderCtrl.checkoutOrder);

export default 'orders';
