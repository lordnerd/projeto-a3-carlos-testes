import { Router } from 'express';
import { AppRouter } from './AppRouter';

import { CreateUserController } from '../controllers';

const createUserController = new CreateUserController();

function routes(): AppRouter {
  const router = Router();

  router.post('/', createUserController.execute);

  return {
    path: '/users',
    router,
  };
}

export const userRoutes = routes();
