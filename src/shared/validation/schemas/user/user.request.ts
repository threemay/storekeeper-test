import Joi from 'joi';
import addressSchema from '../address/address.request';

// the auto convert lib doesn't support joi's extend method yet
// this is a work around
const baseSchema = {
  _id: Joi.string().required(),
  password: Joi.string().min(4).max(10).required(),
  DOB: Joi.string().optional(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string().optional(),
  role: Joi.string().valid('manager', 'receptionist', 'therapist').required(),
  gender: Joi.string().valid('male', 'female').required(),
  mobile: Joi.string()
    .regex(
      /^(?:\+?61|0)4 ?(?:(?:[01] ?[0-9]|2 ?[0-57-9]|3 ?[1-9]|4 ?[7-9]|5 ?[018]) ?[0-9]|3 ?0 ?[0-5])(?: ?[0-9]){5}$/
    )
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
  address: addressSchema.optional(),
  certified: Joi.bool().optional(),
  active: Joi.bool().optional(),
};

export const userSchema = Joi.object({
  ...baseSchema,
}).meta({ className: 'IUser' });

export const addUserSchema = Joi.object({
  ...baseSchema,
}).meta({ className: 'IAddUserRequest' });

export const updateUserSchema = Joi.object({
  ...baseSchema,
}).meta({ className: 'IUpdateUserRequest' });
