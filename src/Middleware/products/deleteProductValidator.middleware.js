const Joi = require('joi');

const deleteProductValidator = (req, res, next) => {
  const error = Joi.object({
    id: Joi.number().min(1).error(new Error('please provide valid id')).required(),
    createdBy: Joi.number()
      .min(1)
      .error(new Error('please provide valid created by id'))
      .required(),
  }).validate({ id: req.params.id, createdBy: req.body.createdBy }).error;

  if (error === undefined) {
    res.locals.ids = {
      id: req.params.id,
      createdBy: req.body.createdBy
    };
    next();
  } else {
    throw new Error(error.message);
  }
};
module.exports = deleteProductValidator;
