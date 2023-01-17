const Joi = require('joi');

const nameUserValidator = (req, res, next) => {
  const error = Joi.object({
    name: Joi.string().trim().min(1).error(new Error('please provide valid name')).required(),
  }).validate(req.params).error;

  if (error === undefined) {
    const criteria = {
      name: req.params.name,
    };
    res.locals.criteria = criteria;
    next();
  } else {
    throw new Error(error.message);
  }
};

module.exports = nameUserValidator;
