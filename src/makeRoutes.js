import userRouter from './routes/user';
import userAuthRouter from './routes/user/auth';
import EmailController from './controllers/EmailController';

const makeRoutes = app => {
  // public routes
  app.use('/public/v1/users', userRouter);

  // authenticated routes
  app.use('/auth/v1/users', userAuthRouter);
  app.post('/auth/v1/fulfilments/send-email', EmailController.sendEmail);
};

export default makeRoutes;
