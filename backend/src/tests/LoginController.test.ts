import { LoginController } from '../controllers/auth';
import { users } from '../data/users';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(() => {
    controller = new LoginController();
    // Limpa e adiciona usuários de teste antes de cada execução
    users.length = 0;
    users.push({
      id: 1,
      name: 'João da Silva',
      email: 'joao@email.com',
      password: '123456',
    });
  });

  it('deve retornar status 200 e mensagem de sucesso para login válido', async () => {
    const mockRequest = {
      body: {
        email: 'joao@email.com',
        password: '123456',
      },
    } as any;

    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });

    const mockResponse = {
      status,
    } as any;

    await controller.execute(mockRequest, mockResponse);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith('Login realizado com sucesso');
  });

  it('deve retornar status 401 e mensagem de erro para login inválido', async () => {
    const mockRequest = {
      body: {
        email: 'joao@email.com',
        password: 'senhaErrada',
      },
    } as any;

    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });

    const mockResponse = {
      status,
    } as any;

    await controller.execute(mockRequest, mockResponse);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith('Email ou senha incorretos');
  });
});
