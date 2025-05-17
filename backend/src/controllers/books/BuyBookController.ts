import { Request, Response } from 'express';
import { books } from '../../data/books';
import { Errors } from '../../errors';

export class BuyBookController {
  constructor() {}

  async execute(req: Request, res: Response) {
    const bookId = parseInt(req.params.id);
    const book = books.find((b) => b.id === bookId);

    if (!book) {
      return res.status(404).json(Errors.BOOK_NOT_FOUND);
    }
    if (book.stock <= 0) {
      return res.status(400).json(Errors.BOOK_OUT_OF_STOCK);
    }

    book.stock -= 1;

    res.json(`Compra realizada com sucesso: ${book.title}`);
  }
}
