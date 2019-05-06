import userRouter from './routes/user';
import typeRouter from './routes/notification/type';
import templateRouter from './routes/notification/template';
import userAuthRouter from './routes/user/auth';
import typeAuthRouter from './routes/notification/type/auth';
import fulfilmentRouter from './routes/fulfillment';
import fulfilmentAuthRouter from './routes/fulfillment/auth';
import fulfilmentRouter from './routes/fulfilment';
import fulfilmentAuthRouter from './routes/fulfilment/auth';

const makeRoutes = app => {
  // public routes
  app.use('/public/v1/users', userRouter);
  app.use('/public/v1/notifications/types', typeRouter);
  app.use('/public/v1/notifications/templates', templateRouter);
  app.use('/public/v1//fulfillments', fulfilmentRouter);
  app.use('/public/v1//fulfillment', fulfilmentRouter);

  // authenticated routes
  app.use('/auth/v1/users', userAuthRouter);
  app.use('/auth/v1/notifications/types', typeAuthRouter);
  app.post('/auth/v1/fulfillments', fulfilmentAuthRouter);
  app.post('/auth/v1/fulfilment', fulfilmentAuthRouter);
};

export default makeRoutes;
