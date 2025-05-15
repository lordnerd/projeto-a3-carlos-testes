import { Request, Response } from 'express';

import { users } from '../../data/users';

export class LoginController {
  constructor() {}

  async execute(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return res.status(401).json('Email ou senha incorretos');
    }

    res.status(200).json('Login realizado com sucesso');
  }
}
