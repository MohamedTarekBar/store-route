const User = require('../Model/users.model');

const model = new User();

const indexUsers = async (req, res, next) => {
  try {
    const users = await model.index();
    return res.json({
      status: 200,
      message: 'retreive users successfully',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await model.create(res.locals.user);
    return res.json({
      status: 200,
      message: 'user added successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await model.update(res.locals.user);
    return res.json({
      status: 200,
      message: 'user updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await model.delete(res.locals.user);
    return res.json({
      status: 200,
      message: 'user deleted successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const searchUser = async (req, res, next) => {
  try {
    const users = await model.searchByNameAndAge(res.locals.criteria);
    return res.json({
      status: 200,
      message: 'users retrieved successfully',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
const searchUsersByName = async (req, res, next) => {
  try {
    const users = await model.searchByName(res.locals.criteria);
    return res.json({
      status: 200,
      message: 'user retrieved successfully',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const searchUsersByListOfIds = async (req, res, next) => {
  try {
    const users = await model.getUsersByIds(res.locals.ids);
    return res.json({
      status: 200,
      message: 'user retrieved successfully',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsersWithProducts = async (req,res,next) => {
  try {
    const up = await model.getAllUsersWithProducts();
    return res.json({
      status: 200,
      message: 'users with products retrieved successfully',
      data: up,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  indexUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
  searchUsersByName,
  searchUsersByListOfIds,
  getAllUsersWithProducts
};
