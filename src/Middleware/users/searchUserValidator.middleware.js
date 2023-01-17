const Joi = require('joi');

const searchUserValidator = (req, res, next) => {
  const error = Joi.object({
    name: Joi.string().trim().min(1).error(new Error('please provide valid name')).required(),
    age: Joi.number().min(1).error(new Error('please provide valid age')).required(),
  }).validate(req.body).error;

  if (error === undefined) {
    const criteria = {
      name: req.body.name,
      age: req.body.age,
    };
    res.locals.criteria = criteria;
    next();
  } else {
    throw new Error(error.message);
  }
};

module.exports = searchUserValidator;
