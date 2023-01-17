const Joi = require('joi');

const updateUserValidator = (req, res, next) => {
  const error = Joi.object({
    id: Joi.number().min(1).error(new Error('id is required')).required(),
    name: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .error(new Error('name is required and should be valid')),
    age: Joi.number().min(0).max(99).error(new Error('age is required and should be valid')),
    email: Joi.string()
      .trim()
      .email({ tlds: { allow: false } })
      .error(new Error('email is required and should be valid')),
    password: Joi.string()
      .min(6)
      .max(255)
      .error(new Error('password is required and should be valid')),
  }).validate({
    id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    password: req.body.password,
  }).error;

  if (error === undefined) {
    res.locals.user = {
      id: req.params.id,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      password: req.body.password,
    };
    next();
  } else {
    throw new Error(error.message);
  }
};

module.exports = updateUserValidator;
