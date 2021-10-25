import { IAddBranchRequest } from '../../shared/validation/interfaces/branch';
export declare const fakeAddBranchRequest: IAddBranchRequest;
export declare const fakeAddBranchResponse: {
    _id: string;
    fullName: string;
    name: string;
    address: {
        address: string;
        suburb: string;
        postcode: number;
        city: string;
        country: string;
    };
    contactNumber: string;
    manager: string;
    description: string;
    logo: string;
    timezone: string;
    comment: string;
    active: boolean;
};
