import express from 'express';
import { books } from '../data/books';

const router = express.Router();

router.post('/buy/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) return res.status(404).send('Livro não encontrado');
  if (book.stock <= 0) return res.status(400).send('Livro fora de estoque');

  book.stock -= 1;
  res.send(`Compra realizada com sucesso: ${book.title}`);
});

export default router;
