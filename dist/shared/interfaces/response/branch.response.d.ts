import { IAddress } from '../../validation/interfaces/address';
export interface IAddBranchResponse {
    _id: string;
    active: boolean;
    address: IAddress;
    comment: string;
    contactNumber: string;
    description: string;
    fullName: string;
    logo: string;
    manager: string;
    name: string;
    timezone: string;
}
export interface IGetBranchResponse {
    _id: string;
    active: boolean;
    address: IAddress;
    comment: string;
    contactNumber: string;
    description: string;
    fullName: string;
    logo: string;
    manager: string;
    name: string;
    timezone: string;
}
export interface IGetAllBranchResponse {
    _id: string;
    active: boolean;
    contactNumber: string;
    fullName: string;
    logo: string;
    manager: string;
    name: string;
    timezone: string;
}
