const express = require('express');
const productsRoute = express.Router();

productsRoute.route('/');
module.exports = productsRoute;
