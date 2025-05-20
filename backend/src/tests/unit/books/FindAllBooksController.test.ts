import { FindAllBooksController } from '../../../controllers/books/FindAllBooksController';
import { Request, Response } from 'express';
import { books } from '../../../data/books';

describe('FindAllBooksController', () => {
  it('should return all books with status 200', async () => {
    const req = {} as Request;

    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    const res = {
      status: statusMock,
    } as unknown as Response;

    const controller = new FindAllBooksController();

    await controller.execute(req, res);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(books);
  });
});
