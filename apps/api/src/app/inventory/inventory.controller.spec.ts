import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

describe('InventoryController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [InventoryService],
    }).compile();
  });

  describe('getInventory', () => {
    it('should return "Welcome to api!"', () => {
      const inventoryController = app.get<InventoryController>(InventoryController);
      expect(inventoryController.getInventory()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
