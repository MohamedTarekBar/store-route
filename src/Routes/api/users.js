const express = require('express');
const {
  indexUsers,
  createUser,
  updateUser,
  deleteUser,
  getProductsOwners,
} = require('../../Controller/users.controller');
const createUserValidator = require('../../Middleware/users/createUserValidator.middleware');
const idUserValidator = require('../../Middleware/users/idUserValidator.middleware');
const updateUserValidator = require('../../Middleware/users/updateUserValidator.middleware');
const usersRoute = express.Router();

usersRoute.route('/').get(indexUsers).post(createUserValidator, createUser);
usersRoute.route('/:id').patch(updateUserValidator, updateUser).delete(idUserValidator, deleteUser);
usersRoute.route('/pivot').get(getProductsOwners);
module.exports = usersRoute;
