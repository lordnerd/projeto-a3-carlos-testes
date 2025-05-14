import express from 'express';
import { users } from '../data/users';
import { User } from '../models/User';

const router = express.Router();

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).send('Usuário já cadastrado');

  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    password
  };

  users.push(newUser);
  res.status(201).send('Usuário cadastrado com sucesso');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).send('Email ou senha incorretos');

  res.send('Login realizado com sucesso');
});

export default router;
