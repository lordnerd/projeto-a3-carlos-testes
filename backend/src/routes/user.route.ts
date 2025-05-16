<<<<<<< HEAD
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
=======
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
>>>>>>> 0be6e85e4f4b5d87dec36ff5e8a3b39a25aa1046
