import { Test, TestingModule } from '@nestjs/testing';
import { CartGateway } from './cart.gateway';
import { CartService } from './cart.service';

describe('CartGateway', () => {
  let gateway: CartGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartGateway, CartService],
    }).compile();

    gateway = module.get<CartGateway>(CartGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
