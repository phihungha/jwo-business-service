import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CartGateway } from './cart.gateway';
import { CartService } from './cart.service';
import { CartUpdateDto } from './dtos/cart-update.dto';

@Controller()
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cartGateway: CartGateway,
  ) {}

  @EventPattern('cart-updates')
  async update(@Payload() body: CartUpdateDto): Promise<void> {
    const cart = await this.cartService.update(body);
    await this.cartGateway.emitCartToAll(cart);
  }
}
