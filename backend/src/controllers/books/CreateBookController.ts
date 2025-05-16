<<<<<<< HEAD
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
=======
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
>>>>>>> 0be6e85e4f4b5d87dec36ff5e8a3b39a25aa1046
