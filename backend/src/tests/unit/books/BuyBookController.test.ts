import { BuyBookController } from '../../../controllers/books/BuyBookController';
import { books } from '../../../data/books';
import { Errors } from '../../../errors';

describe('BuyBookController', () => {
  let controller: BuyBookController;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    controller = new BuyBookController();

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar 401 se o usuário não estiver autenticado', async () => {
    mockReq = { params: { id: '1234' } }; // sem req.user

    await controller.execute(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(Errors.UNAUTHORIZED);
  });

  it('deve retornar 404 se o livro não for encontrado', async () => {
    mockReq = {
      params: { id: '9999' },
      user: { id: 1 }, // simula usuário autenticado
    };

    await controller.execute(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith(Errors.BOOK_NOT_FOUND);
  });

  it('deve retornar 400 se o livro estiver fora de estoque', async () => {
    books.push({
      id: 1234,
      title: 'Livro Teste',
      author: 'Autor Teste',
      stock: 0,
    });

    mockReq = {
      params: { id: '1234' },
      user: { id: 1 }, // simula usuário autenticado
    };

    await controller.execute(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(Errors.BOOK_OUT_OF_STOCK);

    books.pop();
  });

  it('deve decrementar o estoque e retornar sucesso ao comprar o livro', async () => {
    books.push({
      id: 5678,
      title: 'Livro Comprável',
      author: 'Autor Teste 2',
      stock: 2,
    });

    mockReq = {
      params: { id: '5678' },
      user: { id: 1 }, // simula usuário autenticado
    };

    await controller.execute(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(
      'Compra realizada com sucesso: Livro Comprável'
    );
    expect(books.find((b) => b.id === 5678)?.stock).toBe(1);

    books.pop();
  });
});
