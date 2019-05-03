import userRouter from './routes/user';
import fulfilmentsAuthRouter from './routes/fulfilments/auth';
import userAuthRouter from './routes/user/auth';

const makeRoutes = app => {
  // public routes
  app.use('/public/v1/users', userRouter);

  // authenticated routes
  app.use('/auth/v1/users', userAuthRouter);
  app.post('/auth/v1/fulfilments', fulfilmentsAuthRouter);
};

export default makeRoutes;
