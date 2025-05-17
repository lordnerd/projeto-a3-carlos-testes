import { Request, Response } from 'express';

import { users } from '../../data/users';
import { Errors } from '../../errors';

export class DeleteUserController {
  constructor() {}

  async execute(req: Request, res: Response) {
    const { id } = req.params;

    const paramsId = Number(id);

    const exists = users.find((u) => u.id === paramsId);

    if (!exists) {
      return res.status(400).json(Errors.USER_NOT_FOUND);
    }

    const index = users.findIndex((user) => user.id === paramsId);

    if (index !== -1) {
      users.splice(index, 1);
    }

    res.status(201).json('Usuário removido com sucesso');
  }
}
