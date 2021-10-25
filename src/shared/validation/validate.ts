import Joi from 'joi';

const JoiValidate = async <T>(data: object, schema: Joi.Schema): Promise<T> =>
  schema.validateAsync(data, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

export default JoiValidate;
