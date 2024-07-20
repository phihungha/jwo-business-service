import { Module } from '@nestjs/common';

import { CartController } from './cart.controller';
import { CartGateway } from './cart.gateway';
import { CartService } from './cart.service';

@Module({
  providers: [CartGateway, CartService],
  controllers: [CartController],
})
export class CartModule {}
