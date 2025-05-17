import { CreateBookController } from '../../../controllers/books';
import { books } from '../../../data/books';

describe('CreateBookController', () => {
  let controller: CreateBookController;

  beforeEach(() => {
    controller = new CreateBookController();
    // Limpa o array antes de cada teste para evitar efeitos colaterais
    books.length = 0;
  });

  it('deve adicionar um novo livro e retornar status 201 com mensagem de sucesso', async () => {
    const mockRequest = {
      body: {
        title: 'Dom Casmurro',
        author: 'Machado de Assis',
        stock: 10,
      },
    } as any;

    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });

    const mockResponse = {
      status,
    } as any;

    await controller.execute(mockRequest, mockResponse);

    // Verifica se o livro foi adicionado
    expect(books.length).toBe(1);
    expect(books[0]).toEqual({
      id: 1,
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      stock: 10,
    });

    // Verifica se a resposta foi enviada corretamente
    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith('Livro cadastrado com sucesso');
  });
});
