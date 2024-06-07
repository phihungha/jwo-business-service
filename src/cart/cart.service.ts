import { Injectable } from '@nestjs/common';

import { CartUpdateDto } from './dto/cart-update.dto';

@Injectable()
export class CartService {
  findAll() {
    return `This action returns all cart`;
  }

  update(cartUpdateDto: CartUpdateDto) {
    return `This action updates cart: ${cartUpdateDto}`;
  }
}
