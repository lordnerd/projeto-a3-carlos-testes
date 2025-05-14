import express from 'express';
import { books } from '../data/books';
import { Book } from '../models/Book';

const router = express.Router();

router.post('/add', (req, res) => {
  const { title, author, stock } = req.body;
  const newBook: Book = {
    id: books.length + 1,
    title,
    author,
    stock
  };
  books.push(newBook);
  res.status(201).send('Livro cadastrado com sucesso');
});

router.get('/', (req, res) => {
  res.send(books);
});

export default router;
