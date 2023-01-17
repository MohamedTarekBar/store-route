const Joi = require('joi');

const idsUserValidator = (req, res, next) => {
  const error = Joi.object({
    ids: Joi.array()
      .items(Joi.number().min(1).error(new Error('id should be a number')).required())
      .required(),
  }).validate(req.body).error;

  if (error === undefined) {
    const str = req.body.ids.map((item) => {
      return item.toString();
    });
    res.locals.ids = { ids: str };
    next();
  } else {
    throw new Error(error.message);
  }
};

module.exports = idsUserValidator;
