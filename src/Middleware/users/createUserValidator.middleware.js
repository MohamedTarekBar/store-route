const Joi = require('joi');

const createUserValidator = (req, res, next) => {
  console.log(req.body);
  const error = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .error(new Error('name is required and should be valid'))
      .required(),
    age: Joi.number()
      .min(0)
      .max(99)
      .error(new Error('age is required and should be valid'))
      .required(),
    email: Joi.string()
      .trim()
      .email({ tlds: { allow: false } })
      .error(new Error('email is required and should be valid'))
      .required(),
    password: Joi.string()
      .min(6)
      .max(255)
      .error(new Error('password is required and should be valid'))
      .required(),
  }).validate(req.body).error;
  if (error === undefined) {
    res.locals.user = {
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

module.exports = createUserValidator;
