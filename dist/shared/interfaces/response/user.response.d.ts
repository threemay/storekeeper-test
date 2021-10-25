import { IAddress } from '../../validation/interfaces/address';
import { Gender, Role } from '../common';
export interface IAddUserResponse {
    DOB: string;
    _id: string;
    active: boolean;
    address: IAddress;
    certified: boolean;
    email: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    mobile: string;
    password: string;
    role: Role;
    userName: string;
}
export interface IGetUserResponse {
    DOB: string;
    _id: string;
    active: boolean;
    address: IAddress;
    certified: boolean;
    email: string;
    firstName: string;
    gender: Gender;
    lastName: string;
    mobile: string;
    password: string;
    role: Role;
    userName: string;
}
export interface IGetAllUserResponse {
    DOB: string;
    _id: string;
    active: boolean;
    address: IAddress;
    certified: boolean;
    email: string;
    firstName: string;
    gender: Gender;
    lastName: string;
    mobile: string;
    password: string;
    role: Role;
    userName: string;
}
