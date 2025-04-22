const { Router } = require('./router');
const ordersController = require('../controllers/ordersController');

const router = new Router();

router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getOrderById);
router.post('/', ordersController.createOrder);
router.put('/:id', ordersController.updateOrder);
router.patch('/:id', ordersController.partialUpdateOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;