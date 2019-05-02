import userRouter from './routes/user';
import emailRouter from './routes/email';
import userAuthRouter from './routes/user/auth';

const routes = app => {
  // public routes
  app.use('/public/v1/users', userRouter);
  app.use('/public/v1', emailRouter);

  // authenticated routes
  app.use('/auth/v1/users', userAuthRouter);
};

export default routes;
