import userRouter from './routes/user';
import userAuthRouter from './routes/user/auth';
import NotificationTemplateController from './controllers/NotificationTemplateController';


const makeRoutes = app => {
  // public routes
  app.use('/public/v1/users', userRouter);
  app.get('/public/v1/notifications/templates', NotificationTemplateController.getTemplates);
  app.get('/public/v1/notifications/templates/:id', NotificationTemplateController.getTemplate);

  // authenticated routes
  app.use('/auth/v1/users', userAuthRouter);
};

export default makeRoutes;
