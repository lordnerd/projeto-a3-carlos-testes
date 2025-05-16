import { Router } from 'express';
import { AppRouter } from './AppRouter';

import { LoginController } from '../controllers';

const loginController = new LoginController();

function routes(): AppRouter {
  const router = Router();

  router.post('/login', loginController.execute);

  return {
    path: '/auth',
    router,
  };
}

export const authRoutes = routes();
