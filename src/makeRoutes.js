import typeRouter from './routes/notification/type';
import templateRouter from './routes/notification/template';
import typeAuthRouter from './routes/notification/type/auth';
import fulfillmentRouter from './routes/fulfillment';
import fulfillmentAuthRouter from './routes/fulfillment/auth';
import followUpRouter from './routes/follow-up';
import followUpRouterAuthRouter from './routes/follow-up/auth';

const makeRoutes = app => {
  // public routes
  app.use('/public/v1/notifications/types', typeRouter);
  app.use('/public/v1/notifications/templates', templateRouter);
  app.use('/public/v1/follow-ups', followUpRouter);
  app.use('/public/v1/fulfillments', fulfillmentRouter);

  // authenticated routes
  app.use('/auth/v1/notifications/types', typeAuthRouter);
  app.use('/auth/v1/follow-ups', followUpRouterAuthRouter);
  app.use('/auth/v1/fulfillments', fulfillmentAuthRouter);
};

export default makeRoutes;
