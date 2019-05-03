import userRouter from './routes/user';
import userAuthRouter from './routes/user/auth';
import NotificationTypeController from './controllers/NotificationTypeController';

const makeRoutes = app => {
  // public routes
  app.use('/public/v1/users', userRouter);
  app.get('/public/v1/notifications/types', NotificationTypeController.getTypes);
  app.get('/public/v1/notifications/types/:id', NotificationTypeController.getType);

  // authenticated routes
  app.use('/auth/v1/users', userAuthRouter);
  app.post('/auth/v1/notifications/types', NotificationTypeController.createType);
  app.put('/auth/v1/notifications/types/:id', NotificationTypeController.updateType);
  app.delete('/auth/v1/notifications/types/:id', NotificationTypeController.deleteType);
};

export default makeRoutes;
