/* eslint-disable no-underscore-dangle */
import 'reflect-metadata';
import mongoose from 'mongoose';
import { container } from 'tsyringe';
import BranchModel from '../../../models/branch.model';
import { fakeAddBranchRequest } from '../../__mocks__/branch';

describe('/v1/branches', () => {
  const { model } = container.resolve(BranchModel);
  beforeAll(async () => {
    try {
      await mongoose.connect((global as any).__MONGO_URI__);
    } catch (e) {
      process.exit(1);
    }
  });

  afterAll(async () => {
    const db = mongoose.connection;
    await db.close();
  });

  it('should save the branch if the fields are valid', async () => {
    const data = await model.create(fakeAddBranchRequest);
    const response = await model.findById(data._id);
    expect(response).toMatchObject(fakeAddBranchRequest);
    expect(response?._id).toBeDefined();
    expect(response?.createdAt).toBeDefined();
  });
});
