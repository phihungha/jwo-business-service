import { Module } from '@nestjs/common';

import { CartGateway } from './cart.gateway';
import { CartService } from './cart.service';

@Module({
  providers: [CartGateway, CartService],
})
export class CartModule {}
