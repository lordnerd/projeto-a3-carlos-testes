import { Router } from 'express';
import { AppRouter } from './AppRouter';
import {
  BuyBookController,
  CreateBookController,
  FindAllBooksController,
} from '../controllers';

const createBookController = new CreateBookController();
const findAllBooksController = new FindAllBooksController();
const buyBookController = new BuyBookController();

function routes(): AppRouter {
  const router = Router();

  router.post('/', createBookController.execute);
  router.get('/', findAllBooksController.execute);
  router.patch('/buy/:id', buyBookController.execute);

  return {
    path: '/books',
    router,
  };
}

export const bookRoutes = routes();
