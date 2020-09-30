import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { InventoryService } from './inventory.service';

class ArticleModelMock {
  static find = jest.fn(() => ArticleModelMock);
  static exec = jest.fn(() => ArticleModelMock);
  static sort = jest.fn(() => ArticleModelMock);
  static findOneAndUpdate = jest.fn(() => ArticleModelMock);
}

describe('InventoryService', () => {
  let service: InventoryService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: getModelToken('Article'),
          useValue: ArticleModelMock,
        },
      ],
    }).compile();

    service = app.get<InventoryService>(InventoryService);
  });

  describe('getInventory', () => {
    beforeAll(() => service.getInventory());

    afterAll(() => jest.clearAllMocks());

    it('should find the articles in the db', () => {
      expect(ArticleModelMock.find).toHaveBeenCalledWith({}, '-_id id name stock');
    });

    it('should sort the articles by "id"', () => {
      expect(ArticleModelMock.sort).toHaveBeenCalledWith({ id: 1 });
    });

    it('should perform the db query', () => {
      expect(ArticleModelMock.exec).toHaveBeenCalled();
    });
  });
});
