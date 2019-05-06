import userRouter from './routes/user';
import typeRouter from './routes/notification/type';
import templateRouter from './routes/notification/template';
import userAuthRouter from './routes/user/auth';
import typeAuthRouter from './routes/notification/type/auth';
import fulfillmentRouter from './routes/fulfillment';
import fulfillmentAuthRouter from './routes/fulfillment/auth';

const makeRoutes = app => {
  // public routes
  app.use('/public/v1/users', userRouter);
  app.use('/public/v1/notifications/types', typeRouter);
  app.use('/public/v1/notifications/templates', templateRouter);
  app.use('/public/v1/fulfillments', fulfillmentRouter);

  // authenticated routes
  app.use('/auth/v1/users', userAuthRouter);
  app.use('/auth/v1/notifications/types', typeAuthRouter);
  app.use('/auth/v1/fulfillments', fulfillmentAuthRouter);
};

export default makeRoutes;
