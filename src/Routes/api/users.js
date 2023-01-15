const express = require('express');
const { indexUsers, createUser, updateUser } = require('../../Controller/users.controller');
const createUserValidator = require('../../Middleware/users/createUserValidator.middleware');
const updateUserValidator = require('../../Middleware/users/updateUserValidator.middleware');
const usersRoute = express.Router()

usersRoute.route('/').get(indexUsers).post(createUserValidator,createUser)
usersRoute.route('/:id').patch(updateUserValidator,updateUser)


module.exports = usersRoute;