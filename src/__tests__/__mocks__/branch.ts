import { IAddBranchRequest } from '../../shared/validation/interfaces/branch';

const branch = {
  fullName: 'branch full name',
  name: 'BFN',
  address: {
    address: '111 fake street',
    suburb: 'suburb',
    postcode: 4000,
    city: 'Brisbane',
    country: 'Australia',
  },
  contactNumber: '0412345678',
  manager: 'staff001',
  description: 'this is a fake branch',
  logo: 'http://example.com',
  timezone: 'GMT-200',
  comment: 'no comment',
  active: true,
};
export const fakeAddBranchRequest: IAddBranchRequest = {
  ...branch,
};
export const fakeAddBranchResponse = {
  ...branch,
  _id: 'fake Id',
};
