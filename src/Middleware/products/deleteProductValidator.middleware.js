const Joi = require('joi');

const deleteProductValidator = (req, res, next) => {
  const error = Joi.object({
    id: Joi.number().min(1).error(new Error('please provide valid id')).required(),
    createdBy: Joi.number()
      .min(1)
      .error(new Error('please provide valid created by id'))
      .required(),
  }).validate(req.body).error;

  if (error === undefined) {
    const { id, createdBy } = req.body;
    res.locals.ids = {
      id,
      createdBy,
    };
    next();
  } else {
    throw new Error(error.message);
  }
};
module.exports = deleteProductValidator;
