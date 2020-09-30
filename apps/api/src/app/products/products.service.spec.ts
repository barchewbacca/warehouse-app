import { Test } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = app.get<ProductsService>(ProductsService);
  });

  describe('getProducts', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getProducts()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
