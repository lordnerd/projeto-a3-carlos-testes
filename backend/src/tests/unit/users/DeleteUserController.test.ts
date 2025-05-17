import { Request, Response } from 'express';
import { DeleteUserController } from '../../../controllers/users/DeleteUserController';
import { users } from '../../../data/users';
import { Errors } from '../../../errors';

describe('Testar o módulo de deletar usuário', () => {
  const controller: DeleteUserController = new DeleteUserController();
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
      name: 'Usuário Exemplo',
      email: 'exemplo@example.com',
      password: '123456',
    });
  });

  it('deve remover um usuário existente com sucesso', async () => {
    req = {
      params: { id: '1' },
    };

    await controller.execute(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith('Usuário removido com sucesso');
    expect(users).toHaveLength(0);
  });

  it('deve retornar erro 400 ao tentar deletar um usuário inexistente', async () => {
    req = {
      params: { id: '999' },
    };

    await controller.execute(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(Errors.USER_NOT_FOUND);
    expect(users).toHaveLength(1);
  });
});
