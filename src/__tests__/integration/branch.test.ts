/* eslint-disable no-underscore-dangle */
import 'reflect-metadata';
import mongoose from 'mongoose';
import { container } from 'tsyringe';
import request from 'supertest';
import BranchModel from '../../models/branch.model';
import app from '../../app';
import { fakeAddBranchRequest } from '../__mocks__/branch';

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

  describe('POST /', () => {
    it('should return 201 with the saved branch if the request is valid', async () => {
      const res = await request(app).post(`/v1/branches`).send(fakeAddBranchRequest);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toMatchObject(fakeAddBranchRequest);
      expect(res.body.data._id).toBeDefined();
      expect(res.body.data.createdAt).toBeDefined();
    });
  });

  describe('GET /', () => {
    beforeEach(async () => {
      await model.deleteMany({});
    });
    it('should return 200 with all branches and pagination if the request is valid', async () => {
      await model.insertMany([fakeAddBranchRequest, fakeAddBranchRequest]);
      const res = await request(app).get(`/v1/branches`).send();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('pagination');
      expect(Array.isArray(res.body.data)).toBeTruthy();
      expect(res.body.data.length).toBe(2);
      expect(res.body.data[0]).toMatchObject(fakeAddBranchRequest);
      expect(res.body.pagination.count).toBe(2);
    });
  });
});
