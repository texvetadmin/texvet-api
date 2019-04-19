import userRouter from './routes/user';
import userAuthRouter from './routes/user/auth';

const makeRoutes = app => {
  // public routes
  app.use('/public/v1/users', userRouter);

  // authenticated routes
  app.use('/auth/v1/users', userAuthRouter);
};

export default makeRoutes;
