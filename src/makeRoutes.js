import userRouter from './routes/user';
import typeRouter from './routes/notification/type';
import userAuthRouter from './routes/user/auth';
import typeAuthRouter from './routes/notification/type/auth';

const makeRoutes = app => {
  // public routes
  app.use('/public/v1/users', userRouter);
  app.use('/public/v1/notifications/types', typeRouter);


  // authenticated routes
  app.use('/auth/v1/users', userAuthRouter);
  app.use('/auth/v1/notifications/types', typeAuthRouter);
};

export default makeRoutes;
