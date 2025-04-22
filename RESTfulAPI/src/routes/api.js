const { Router } = require('./router');
const medicinesRoutes = require('./medicinesRoutes');
const ordersRoutes = require('./ordersRoutes');

const apiRouter = new Router();

apiRouter.use('/medicines', medicinesRoutes);
apiRouter.use('/orders', ordersRoutes);

module.exports = apiRouter;