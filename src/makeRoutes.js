import userRouter from './routes/user';
import userAuthRouter from './routes/user/auth';
import notificationTemplateRouter from './routes/notification/template';


const makeRoutes = app => {
  // public routes
  app.use('/public/v1/users', userRouter);
  app.use('/public/v1/notifications/templates', notificationTemplateRouter);

  // authenticated routes
  app.use('/auth/v1/users', userAuthRouter);
};

export default makeRoutes;
