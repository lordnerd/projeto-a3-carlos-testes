<<<<<<< HEAD
import { Request, Response } from 'express';

import { users } from '../../data/users';
import { User } from '../../models/User';

export class CreateUserController {
  constructor() {}

  async execute(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const exists = users.find((u) => u.email === email);

    if (exists) {
      return res.status(400).json('Usuário já cadastrado');
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
=======
import { Request, Response } from 'express';

import { users } from '../../data/users';
import { User } from '../../models/User';

export class CreateUserController {
  constructor() {}

  async execute(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const exists = users.find((u) => u.email === email);

    if (exists) {
      return res.status(400).json('Usuário já cadastrado');
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
>>>>>>> 0be6e85e4f4b5d87dec36ff5e8a3b39a25aa1046
