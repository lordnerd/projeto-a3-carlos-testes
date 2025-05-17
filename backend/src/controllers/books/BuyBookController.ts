import { Request, Response } from 'express';
import { books } from '../../data/books';

export class BuyBookController {
  constructor() {}

  async execute(req: Request, res: Response) {
    const bookId = parseInt(req.params.id);
    const book = books.find((b) => b.id === bookId);

    if (!book) {
      return res.status(404).json('Livro não encontrado');
    }
    if (book.stock <= 0) {
      return res.status(400).json('Livro fora de estoque');
    }

    book.stock -= 1;

    res.json(`Compra realizada com sucesso: ${book.title}`);
  }
}
