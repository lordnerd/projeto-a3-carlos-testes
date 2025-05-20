import { FindAllBooksController } from '../../controllers/books/FindAllBooksController';
import { LoginController } from '../../controllers/auth/LoginController';
import { Errors } from '../../errors';

// Importa os dados mockados para usar nas asserções
import { books } from '../../data/books';
import { users } from '../../data/users';

// Mocka os módulos para sobrescrever os exports com arrays mockados
jest.mock('../../data/books', () => ({
  books: [
    { id: 1, title: 'Livro A', author: 'Autor A', stock: 10 },
    { id: 2, title: 'Livro B', author: 'Autor B', stock: 5 },
  ],
}));

jest.mock('../../data/users', () => ({
  users: [
    {
      id: 1,
      name: 'Usuario 1',
      email: 'admin@example.com',
      password: 'admin123',
    },
  ],
}));

// Mock da resposta do Express
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('FindAllBooksController', () => {
  it('deve retornar a lista de livros com status 200', async () => {
    const req = {} as any;
    const res = mockResponse();

    const controller = new FindAllBooksController();
    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(books);
  });
});

describe('LoginController', () => {
  const controller = new LoginController();

  it('deve retornar sucesso com credenciais válidas', async () => {
    const validUser = users[0];

    const req = {
      body: {
        email: validUser.email,
        password: validUser.password,
      },
    } as any;

    const res = mockResponse();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('Login realizado com sucesso');
  });

  it('deve retornar erro 401 com credenciais inválidas', async () => {
    const req = {
      body: {
        email: 'email@invalido.com',
        password: 'senhaerrada',
      },
    } as any;

    const res = mockResponse();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(Errors.INVALID_LOGIN);
  });
});
