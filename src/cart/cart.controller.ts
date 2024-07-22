import { Controller, UsePipes } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RpcValidationPipe } from 'src/infra/validation.pipe';

import { CartGateway } from './cart.gateway';
import { CartService } from './cart.service';
import { CartUpdateDto } from './dtos/cart-update.dto';

@UsePipes(new RpcValidationPipe({ transform: true }))
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
