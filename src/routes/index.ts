import express from 'express';
import branchRouter from './branch.route';

const router = express.Router();

router.use('/branches', branchRouter);

export default router;
