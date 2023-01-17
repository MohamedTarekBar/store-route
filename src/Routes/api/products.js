const express = require('express');
const { indexProducts, createProduct, updateProduct, deleteProduct, filterProductByPrice } = require('../../Controller/products.controller');
const createProductValidator = require('../../Middleware/products/createProductValidator.middleware');
const deleteProductValidator = require('../../Middleware/products/deleteProductValidator.middleware');
const priceProductValidator = require('../../Middleware/products/priceProductValidator.middleware');
const updateProductValidator = require('../../Middleware/products/updateProductValidator.middleware');
const productsRoute = express.Router();

productsRoute.route('/')
.get(indexProducts)
.post(createProductValidator, createProduct);

productsRoute.route('/:id')
.patch(updateProductValidator,updateProduct)
.delete(deleteProductValidator,deleteProduct);

productsRoute.route('/:price')
.get(priceProductValidator,filterProductByPrice);

module.exports = productsRoute;
