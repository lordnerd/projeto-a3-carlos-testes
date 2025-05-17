import { Request, Response } from 'express';

import { users } from '../../data/users';
import { Errors } from '../../errors';

export class UpdateUserController {
  constructor() {}

  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { email, name, password } = req.body;

    if (!id) {
      return res.status(401).json(Errors.ID_NOT_FOUND);
    }

    const paramsId = Number(id);

    const userIndex = users.findIndex((u) => u.id === paramsId);

    if (userIndex === -1) {
      return res.status(400).json(Errors.USER_NOT_FOUND);
    }

    const existingUser = users[userIndex];

    const updatedUser = {
      ...existingUser,
      email: email ?? existingUser.email,
      name: name ?? existingUser.name,
      password: password ?? existingUser.password,
    };

    users[userIndex] = updatedUser;

    res.status(200).json({
      message: 'Usuário atualizado com sucesso',
      user: updatedUser,
    });
  }
}
