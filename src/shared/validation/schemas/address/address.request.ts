import Joi from 'joi';

const addressSchema = Joi.object({
  address: Joi.string().optional(),
  suburb: Joi.string().optional(),
  postcode: Joi.number().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
}).meta({ className: 'IAddress' });

export default addressSchema;
