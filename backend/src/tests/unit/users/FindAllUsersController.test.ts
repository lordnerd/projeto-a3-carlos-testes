import { Request, Response } from 'express';
import { FindAllUsersController } from '../../../controllers/users/FindAllUsersController';
import { users } from '../../../data/users';

describe('Testar o módulo de listar todos os usuários', () => {
  const controller: FindAllUsersController = new FindAllUsersController();
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();

    req = {};
    res = {
      status: statusMock,
      json: jsonMock,
    };

    users.length = 0;
    users.push(
      {
        id: 1,
        name: 'Usuário 1',
        email: 'user1@example.com',
        password: 'senha1',
      },
      {
        id: 2,
        name: 'Usuário 2',
        email: 'user2@example.com',
        password: 'senha2',
      }
    );
  });

  it('deve retornar todos os usuários com status 200', async () => {
    await controller.execute(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(users);
    expect(jsonMock).toHaveBeenCalledTimes(1);
  });
});
