import { Request, Response } from 'express';

import { books } from '../../data/books';

export class FindAllBooksController {
  constructor() {}

  async execute(req: Request, res: Response) {
    res.status(201).json(books);
  }
}
