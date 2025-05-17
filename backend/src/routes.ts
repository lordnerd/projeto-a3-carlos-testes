import { Express } from 'express';

import { authRoutes } from './routes/auth.route';
import { userRoutes } from './routes/user.route';
import { bookRoutes } from './routes/book.route';

export async function loadRoutes(app: Express) {
  app.use(authRoutes.path, authRoutes.router);
  app.use(userRoutes.path, userRoutes.router);
  app.use(bookRoutes.path, bookRoutes.router);
}
