import { Test } from '@nestjs/testing';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let service: InventoryService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [InventoryService],
    }).compile();

    service = app.get<InventoryService>(InventoryService);
  });

  describe('getInventory', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getInventory()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
