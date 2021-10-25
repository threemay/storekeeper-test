import Joi from 'joi';

const RequestQuerySchema = Joi.object({
  page: Joi.number().integer().default(1),
  pageSize: Joi.number().positive().integer().default(10),
  sort: Joi.string().optional(),
  search: Joi.string().optional(),
}).meta({ className: 'IRequestQuery' });

export default RequestQuerySchema;
