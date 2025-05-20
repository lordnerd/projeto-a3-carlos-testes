import { Request, Response } from 'express';

import { books } from '../../data/books';

export class FindAllBooksController {
  constructor() {}

  async execute(req: Request, res: Response) {
    res.status(200).json(books);
  }
}
