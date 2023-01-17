const Joi = require('joi');

const updateProductValidator = (req, res, next) => {
  const error = Joi.object({
    id: Joi.number().min(1).error(new Error('please provide a valid id')).required(),
    name: Joi.string().min(1).max(50).error(new Error('please provide a valid name')),
    description: Joi.string().min(1).max(50).error(new Error('please provide a valid name')),
    price: Joi.number().min(0).error(new Error('please provide me valid price')),
    createdBy: Joi.number().error(new Error('please provide createdBy id')).required(),
  }).validate({
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    createdBy: req.body.createdBy,
  }).error;

  if (error === undefined) {
    const { name, description, price, createdBy } = req.body;
    res.locals.product = {
      id: req.params.id,
      name,
      description: description ? description : null,
      price,
      createdBy,
    };
    next();
  } else {
    throw new Error(error.message);
  }
};

module.exports = updateProductValidator;
