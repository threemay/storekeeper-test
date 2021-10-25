"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeAddBranchResponse = exports.fakeAddBranchRequest = void 0;
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
exports.fakeAddBranchRequest = Object.assign({}, branch);
exports.fakeAddBranchResponse = Object.assign(Object.assign({}, branch), { _id: 'fake Id' });
//# sourceMappingURL=branch.js.map