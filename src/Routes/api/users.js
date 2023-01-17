const express = require('express');
const {
  indexUsers,
  createUser,
  updateUser,
  deleteUser,
  getProductsOwners,
  searchUser,
  searchUsersByName,
  searchUsersByListOfIds,
  getAllUsersWithProducts,
} = require('../../Controller/users.controller');
const createUserValidator = require('../../Middleware/users/createUserValidator.middleware');
const idsUserValidator = require('../../Middleware/users/idsUserValidator.middleware');
const idUserValidator = require('../../Middleware/users/idUserValidator.middleware');
const nameUserValidator = require('../../Middleware/users/nameUserValidator.middleware');
const searchUserValidator = require('../../Middleware/users/searchUserValidator.middleware');
const updateUserValidator = require('../../Middleware/users/updateUserValidator.middleware');
const usersRoute = express.Router();

usersRoute.route('/').get(indexUsers).post(createUserValidator, createUser);

usersRoute.route('/:id').patch(updateUserValidator, updateUser).delete(idUserValidator, deleteUser);

usersRoute.route('/search').get(searchUserValidator, searchUser);

usersRoute.route('/search/list').get(idsUserValidator, searchUsersByListOfIds);

usersRoute.route('/search/:name').get(nameUserValidator, searchUsersByName);

usersRoute.route('/pivot').get(getAllUsersWithProducts)
// index
// create
// update
// delete
// search by name and greater than age provided
// search by char in name

module.exports = usersRoute;
