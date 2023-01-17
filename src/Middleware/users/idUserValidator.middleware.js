const Joi = require('joi');

const idUserValidator = (req, res, next) => {
  const error = Joi.object({
    id: Joi.number().min(1).error(new Error('id is required')).required(),
  }).validate(req.params).error;

  if (error === undefined) {
    res.locals.user = {
      id: req.params.id,
    };
    next();
  } else {
    throw new Error(error.message);
  }
};

module.exports = idUserValidator;
