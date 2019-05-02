import userRouter from './routes/user';
import notificationTypeRouter from './routes/notification/types';
import notificationTypeAuthRouter from './routes/notification/types/auth';
import userAuthRouter from './routes/user/auth';

const makeRoutes = app => {
  // public routes
  app.use('/public/v1/users', userRouter);
  app.use('/public/v1/notifications/types', notificationTypeRouter);

  // authenticated routes
  app.use('/auth/v1/users', userAuthRouter);
  app.use('/auth/v1/notifications/types', notificationTypeAuthRouter);
};

export default makeRoutes;
