import { Router } from 'express';
import { AppRouter } from './AppRouter';

import {
  CreateUserController,
  DeleteUserController,
  FindAllUsersController,
  FindUserByIdController,
  UpdateUserController,
} from '../controllers';

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const findAllUsersController = new FindAllUsersController();
const findUserByIdController = new FindUserByIdController();

function routes(): AppRouter {
  const router = Router();

  router.get('/', findAllUsersController.execute);
  router.get('/:id', findUserByIdController.execute);
  router.post('/', createUserController.execute);
  router.delete('/:id', deleteUserController.execute);
  router.put('/:id', updateUserController.execute);

  return {
    path: '/users',
    router,
  };
}

export const userRoutes = routes();
