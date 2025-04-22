require('dotenv').config();
const App = require('./app');
const apiRouter = require('./src/routes/api');

const app = new App();
const PORT = process.env.PORT || 3000;

app.use(require('./src/middlewares/bodyParser'));

app.use('/api/v1', apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});