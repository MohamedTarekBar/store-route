const Joi = require('joi');

const createProductValidator = (req, res, next) => {
  const error = Joi.object({
    name: Joi.string().min(1).max(50).error(new Error('please provide a valid name')).required(),
    description: Joi.string().min(1).max(50).error(new Error('please provide a valid name')),
    price: Joi.number().min(0).error(new Error('please provide me valid price')).required(),
    createdBy: Joi.number().error(new Error('please provide createdBy')).required(),
  }).validate(req.body).error;

  if (error === undefined) {
    const { name, description, price, createdBy } = req.body;
    res.locals.product = {
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

module.exports = createProductValidator;
