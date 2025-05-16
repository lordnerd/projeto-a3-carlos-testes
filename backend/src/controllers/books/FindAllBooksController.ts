<<<<<<< HEAD
import { Request, Response } from 'express';

import { books } from '../../data/books';

export class FindAllBooksController {
  constructor() {}

  async execute(req: Request, res: Response) {
    res.status(201).json(books);
  }
}
=======
import { Request, Response } from 'express';

import { books } from '../../data/books';

export class FindAllBooksController {
  constructor() {}

  async execute(req: Request, res: Response) {
    res.status(201).json(books);
  }
}
>>>>>>> 0be6e85e4f4b5d87dec36ff5e8a3b39a25aa1046
