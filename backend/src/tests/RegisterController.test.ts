import { Request, Response } from 'express';
import { RegisterController } from '../controllers/users';
import { users } from '../data/users';

describe('RegisterController', () => {
  let controller: RegisterController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    controller = new RegisterController();

    statusMock = jest.fn().mockReturnThis();
    sendMock = jest.fn();

    req = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: '123456',
      },
    };
    res = {
      status: statusMock,
      send: sendMock,
    };

    users.length = 0; // limpa o array antes de cada teste
  });

  it('should register a new user', async () => {
    await controller.execute(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(sendMock).toHaveBeenCalledWith('Usuário cadastrado com sucesso');
    expect(users).toHaveLength(1);
  });

  it('should return 400 if user already exists', async () => {
    users.push({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    });

    await controller.execute(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(sendMock).toHaveBeenCalledWith('Usuário já cadastrado');
  });
});
