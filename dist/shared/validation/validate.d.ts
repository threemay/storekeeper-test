import Joi from 'joi';
declare const JoiValidate: <T>(data: object, schema: Joi.Schema) => Promise<T>;
export default JoiValidate;
