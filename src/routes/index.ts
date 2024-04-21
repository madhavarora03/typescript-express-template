import HttpResponse from '@/utils/HttpResponse';
import { Router } from 'express';
import userRouter from './user.route';

const router = Router();

// health check route
router.get('/healthcheck', (req, res) => {
  return res.status(200).json(
    new HttpResponse(200, {
      message: 'All okay! relax and enjoy a tea 🍀',
      success: true,
    }),
  );
});

// other routes
router.use('/users', userRouter);

export default router;
