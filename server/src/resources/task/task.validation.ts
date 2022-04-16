import Joi from 'joi';

const create = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  expirationDate: Joi.date(),
});

const update = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  expirationDate: Joi.date(),
});

export default { create, update };
