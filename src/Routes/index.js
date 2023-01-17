const express = require('express');
const usersRoute = require('./api/users');
const productsRoute = require('./api/products');
const apiRoute = express.Router();

apiRoute.use('/users', usersRoute);
apiRoute.use('/products', productsRoute);

module.exports = apiRoute;
