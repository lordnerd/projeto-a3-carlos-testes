import { Request, Response } from 'express';

import { users } from '../../data/users';

export class FindAllUsersController {
  constructor() {}

  async execute(req: Request, res: Response) {
    res.status(200).json(users);
  }
}
