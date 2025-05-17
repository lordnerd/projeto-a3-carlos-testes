import { Request, Response } from 'express';
import { CreateUserController } from '../../controllers/users';
import { users } from '../../data/users';

describe('Testar o módulo de criar usuário', () => {
  const controller: CreateUserController = new CreateUserController();
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();

    req = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: '123456',
      },
    };
    res = {
      status: statusMock,
      json: jsonMock,
    };

    users.length = 0; // limpa o array antes de cada teste
  });

  it('deve registrar um novo usuário', async () => {
    await controller.execute(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith('Usuário cadastrado com sucesso');
    expect(users).toHaveLength(1);
  });

  it('deve retornar erro 400 para caso o usuário já exista', async () => {
    users.push({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    });

    await controller.execute(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith('Usuário já cadastrado');
  });
});
