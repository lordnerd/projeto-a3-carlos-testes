import { Request, Response } from 'express';

import { books } from '../../data/books';
import { Book } from '../../models/Book';

export class CreateBookController {
  constructor() {}

  async execute(req: Request, res: Response) {
    const { title, author, stock } = req.body;
    const newBook: Book = {
      id: books.length + 1,
      title,
      author,
      stock,
    };
    books.push(newBook);
    res.status(201).json('Livro cadastrado com sucesso');
  }
}
