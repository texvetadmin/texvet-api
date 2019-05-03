import userRouter from './routes/user';
import typeRouter from './routes/notification/type';
import templateRouter from './routes/notification/template';
import userAuthRouter from './routes/user/auth';
import typeAuthRouter from './routes/notification/type/auth';
import fulfilmentsAuthRouter from './routes/fulfilments/auth';

const makeRoutes = app => {
  // public routes
  app.use('/public/v1/users', userRouter);
  app.use('/public/v1/notifications/types', typeRouter);
  app.use('/public/v1/notifications/templates', templateRouter);
  

  // authenticated routes
  app.use('/auth/v1/users', userAuthRouter);
  app.use('/auth/v1/notifications/types', typeAuthRouter);
  app.post('/auth/v1/fulfilments', fulfilmentsAuthRouter);
};

export default makeRoutes;
