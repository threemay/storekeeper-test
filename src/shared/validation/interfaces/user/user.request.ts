/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

import { IAddress } from '../address';

export interface IAddUserRequest {
  DOB?: string;
  _id: string;
  active?: boolean;
  address?: IAddress;
  certified?: boolean;
  email?: string;
  firstName: string;
  gender: 'male' | 'female';
  lastName: string;
  mobile: string;
  password: string;
  role: 'manager' | 'receptionist' | 'therapist';
  userName?: string;
}

export interface IUpdateUserRequest {
  DOB?: string;
  _id: string;
  active?: boolean;
  address?: IAddress;
  certified?: boolean;
  email?: string;
  firstName: string;
  gender: 'male' | 'female';
  lastName: string;
  mobile: string;
  password: string;
  role: 'manager' | 'receptionist' | 'therapist';
  userName?: string;
}

export interface IUser {
  DOB?: string;
  _id: string;
  active?: boolean;
  address?: IAddress;
  certified?: boolean;
  email?: string;
  firstName: string;
  gender: 'male' | 'female';
  lastName: string;
  mobile: string;
  password: string;
  role: 'manager' | 'receptionist' | 'therapist';
  userName?: string;
}