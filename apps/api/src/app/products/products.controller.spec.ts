import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();
  });

  describe('getProducts', () => {
    it('should return "Welcome to api!"', () => {
      const productsController = app.get<ProductsController>(ProductsController);
      expect(productsController.getProducts()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
