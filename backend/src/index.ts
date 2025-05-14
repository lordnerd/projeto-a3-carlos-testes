import express from 'express';
import authRoutes from './routes/auth';
import bookRoutes from './routes/books';
import salesRoutes from './routes/sales';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/sales', salesRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
