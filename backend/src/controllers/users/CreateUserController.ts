import { Request, Response } from 'express';

import { users } from '../../data/users';
import { User } from '../../models/User';
import { Errors } from '../../errors';

export class CreateUserController {
  constructor() {}

  async execute(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const exists = users.find((u) => u.email === email);

    if (exists) {
      return res.status(400).json(Errors.USER_EMAIL_ALREADY_EXISTS);
    }

    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      password,
    };

    users.push(newUser);

    res.status(201).json('Usuário cadastrado com sucesso');
  }
}
