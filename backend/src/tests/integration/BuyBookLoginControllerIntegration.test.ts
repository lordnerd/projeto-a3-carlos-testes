import { LoginController } from '../../controllers/auth/LoginController';
import { BuyBookController } from '../../controllers/books/BuyBookController';
import { users } from '../../data/users';
import { books } from '../../data/books';
import { Errors } from '../../errors';

describe('Integração LoginController + BuyBookController', () => {
  let loginController: LoginController;
  let buyBookController: BuyBookController;
  let mockRes: any;
  let mockReq: any;

  beforeEach(() => {
    loginController = new LoginController();
    buyBookController = new BuyBookController();

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve permitir login e compra de livro com sucesso', async () => {
    // Configura usuário e livro
    users.push({
      id: 1,
      name: 'User 1',
      email: 'user@test.com',
      password: '1234',
    });
    books.push({
      id: 10,
      title: 'Livro Integração',
      author: 'Autor Teste',
      stock: 2,
    });

    // Fase 1 - Login
    mockReq = { body: { email: 'user@test.com', password: '1234' } };
    await loginController.execute(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith('Login realizado com sucesso');

    // Reset de mocks
    jest.clearAllMocks();

    // Fase 2 - Compra com usuário autenticado
    mockReq = {
      params: { id: '10' },
      user: { id: 1 }, // simulação de usuário autenticado
    };
    await buyBookController.execute(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(
      'Compra realizada com sucesso: Livro Integração'
    );
    expect(books.find((b) => b.id === 10)?.stock).toBe(1);

    users.pop();
    books.pop();
  });

  it('não deve permitir compra de livro se login falhar', async () => {
    books.push({
      id: 20,
      author: 'Autor Teste 2',
      title: 'Livro Sem Login',
      stock: 1,
    });

    // Fase 1 - Login inválido
    mockReq = { body: { email: 'errado@test.com', password: 'wrong' } };
    await loginController.execute(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(Errors.INVALID_LOGIN);

    jest.clearAllMocks();

    // Fase 2 - Compra sem autenticação
    mockReq = {
      params: { id: '20' },
      // sem req.user => simula não autenticado
    };
    await buyBookController.execute(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(Errors.UNAUTHORIZED);
    expect(books.find((b) => b.id === 20)?.stock).toBe(1);

    books.pop();
  });
});
