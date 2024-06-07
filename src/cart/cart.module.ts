import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartGateway } from './cart.gateway';

@Module({
  providers: [CartGateway, CartService],
})
export class CartModule {}
