import Joi from 'joi';
import addressSchema from '../address/address.request';

// the auto convert lib doesn't support joi's extend method yet
// this is a work around
const baseSchema = {
  fullName: Joi.string().required(),
  name: Joi.string().optional(),
  address: addressSchema.optional(),
  contactNumber: Joi.string().required(),
  manager: Joi.string().optional(),
  description: Joi.string().optional(),
  logo: Joi.string().optional(),
  timezone: Joi.string().optional(),
  comment: Joi.string().optional(),
  active: Joi.bool().optional(),
};

export const branchSchema = Joi.object({
  ...baseSchema,
}).meta({ className: 'IBranch' });

export const addBranchSchema = Joi.object({
  ...baseSchema,
}).meta({ className: 'IAddBranchRequest' });

export const updateBranchSchema = Joi.object({
  ...baseSchema,
}).meta({ className: 'IUpdateBranchRequest' });
