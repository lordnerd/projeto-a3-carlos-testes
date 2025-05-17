import { Request, Response } from 'express';

import { users } from '../../data/users';
import { Errors } from '../../errors';

export class FindUserByIdController {
  constructor() {}

  async execute(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json(Errors.ID_NOT_FOUND);
    }

    const paramsId = Number(id);

    const userIndex = users.findIndex((u) => u.id === paramsId);

    if (userIndex === -1) {
      return res.status(400).json(Errors.USER_NOT_FOUND);
    }

    const user = users[userIndex];

    res.status(200).json(user);
  }
}
