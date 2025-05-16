<<<<<<< HEAD
import { Express } from 'express';

import { authRoutes } from './routes/auth.route';
import { userRoutes } from './routes/user.route';
import { bookRoutes } from './routes/book.route';

export async function loadRoutes(app: Express) {
  app.use(authRoutes.path, authRoutes.router);
  app.use(userRoutes.path, userRoutes.router);
  app.use(bookRoutes.path, bookRoutes.router);
}
=======
import { Express } from 'express';

import { authRoutes } from './routes/auth.route';
import { userRoutes } from './routes/user.route';
import { bookRoutes } from './routes/book.route';

export async function loadRoutes(app: Express) {
  app.use(authRoutes.path, authRoutes.router);
  app.use(userRoutes.path, userRoutes.router);
  app.use(bookRoutes.path, bookRoutes.router);
}
>>>>>>> 0be6e85e4f4b5d87dec36ff5e8a3b39a25aa1046
