import { Request, Response } from 'express';
import { UpdateUserController } from '../../../controllers/users/UpdateUserController';
import { users } from '../../../data/users';
import { Errors } from '../../../errors';

describe('Testar o módulo de atualizar usuário', () => {
  const controller: UpdateUserController = new UpdateUserController();
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
      name: 'Original User',
      email: 'original@example.com',
      password: 'password123',
    });
  });

  it('deve atualizar o nome e email do usuário com sucesso', async () => {
    req = {
      params: { id: '1' },
      body: {
        name: 'Usuário Atualizado',
        email: 'atualizado@example.com',
      },
    };

    await controller.execute(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Usuário atualizado com sucesso',
      user: {
        id: 1,
        name: 'Usuário Atualizado',
        email: 'atualizado@example.com',
        password: 'password123',
      },
    });

    expect(users[0].name).toBe('Usuário Atualizado');
    expect(users[0].email).toBe('atualizado@example.com');
  });

  it('deve retornar erro 401 se o id não for fornecido', async () => {
    req = {
      params: {},
      body: { name: 'Teste' },
    };

    await controller.execute(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith(Errors.ID_NOT_FOUND);
  });

  it('deve retornar erro 400 se o usuário não existir', async () => {
    req = {
      params: { id: '999' },
      body: { name: 'Inexistente' },
    };

    await controller.execute(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(Errors.USER_NOT_FOUND);
  });
});
