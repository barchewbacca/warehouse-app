import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Article } from './schemas/article.schema';

const mockArticle: Article = {
  id: '123',
  name: 'lamp',
  stock: 10,
} as Article;

const mockInventoryUpload = fs.readFileSync('assignment/inventory.json').toString();

const mockFile = {
  buffer: mockInventoryUpload,
};

describe('InventoryController', () => {
  let app: TestingModule;

  const inventoryServiceMock = {
    getInventory: jest.fn().mockResolvedValue([mockArticle]),
    fileUpload: jest.fn(),
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        {
          provide: InventoryService,
          useValue: inventoryServiceMock,
        },
      ],
    }).compile();
  });

  describe('getInventory', () => {
    it('should return the list of articles', () => {
      // arrange
      const inventoryController = app.get<InventoryController>(InventoryController);

      // act & assert
      expect(inventoryController.getInventory()).toEqual(new Promise(() => [mockArticle]));
    });
  });

  describe('fileUpload', () => {
    it('should upload the provided inventory.json to the database', () => {
      // arrange
      const inventoryController = app.get<InventoryController>(InventoryController);
      const expectedInventory = JSON.parse(mockInventoryUpload).inventory;

      // act
      inventoryController
        .uploadInventory(mockFile)
        .then(() => {
          // assert
          expect(inventoryServiceMock.fileUpload).toHaveBeenCalledWith(expectedInventory);
        })
        .catch(err => console.log('Error', err));
    });
  });
});
