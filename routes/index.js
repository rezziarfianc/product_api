const products = require('./products.routes');
const routes = require('express').Router();
const bodyParser = require('body-parser');

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

routes.use('/products', products);

module.exports = routes;