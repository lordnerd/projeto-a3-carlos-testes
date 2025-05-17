import { BuyBookController } from '../../controllers/books/BuyBookController';
import { books } from '../../data/books';

describe('BuyBookController', () => {
  let controller: BuyBookController;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    controller = new BuyBookController();

    // Mock res
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    // Limpa mocks
    jest.clearAllMocks();
  });

  it('deve retornar 404 se o livro não for encontrado', async () => {
    mockReq = { params: { id: '9999' } }; // ID inexistente

    await controller.execute(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith('Livro não encontrado');
  });

  it('deve retornar 400 se o livro estiver fora de estoque', async () => {
    // Adiciona um livro de teste com estoque 0
    books.push({
      id: 1234,
      title: 'Livro Teste',
      author: 'Autor Teste',
      stock: 0,
    });

    mockReq = { params: { id: '1234' } };

    await controller.execute(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith('Livro fora de estoque');

    // Remove o livro de teste após o teste
    books.pop();
  });

  it('deve decrementar o estoque e retornar sucesso ao comprar o livro', async () => {
    // Adiciona um livro de teste com estoque 2
    books.push({
      id: 5678,
      title: 'Livro Comprável',
      author: 'Autor Teste 2',
      stock: 2,
    });

    mockReq = { params: { id: '5678' } };

    await controller.execute(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(
      'Compra realizada com sucesso: Livro Comprável',
    );
    expect(books.find((b) => b.id === 5678)?.stock).toBe(1);

    // Remove o livro de teste após o teste
    books.pop();
  });
});
