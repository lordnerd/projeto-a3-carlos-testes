import { Request, Response } from 'express';
import { FindUserByIdController } from '../../../controllers/users/FindUserByIdController';
import { users } from '../../../data/users';
import { Errors } from '../../../errors';

describe('Testar o módulo de buscar usuário por ID', () => {
  const controller: FindUserByIdController = new FindUserByIdController();
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();

    res = {
      status: statusMock,
      json: jsonMock,
    };

    users.length = 0;
    users.push({
      id: 1,
      name: 'Usuário Teste',
      email: 'teste@example.com',
      password: '123456',
    });
  });

  it('deve retornar o usuário corretamente se o ID existir', async () => {
    req = {
      params: { id: '1' },
    };

    await controller.execute(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(users[0]);
  });

  it('deve retornar erro 400 se o usuário não for encontrado', async () => {
    req = {
      params: { id: '999' },
    };

    await controller.execute(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(Errors.USER_NOT_FOUND);
  });

  it('deve retornar erro 401 se o ID não for informado', async () => {
    req = {
      params: {},
    };

    await controller.execute(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith(Errors.ID_NOT_FOUND);
  });
});
