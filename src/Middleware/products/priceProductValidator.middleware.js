const Joi = require('joi');

const priceProductValidator = (req, res, next) => {
  const error = Joi.object({
    price: Joi.number().min(0).error(new Error('please provide me valid price')).required(),
  }).validate(req.body).error;

  if (error === undefined) {
    const { price } = req.body;
    res.locals.price = {
      price,
    };
    next();
  } else {
    throw new Error(error.message);
  }
};
module.exports = priceProductValidator;
