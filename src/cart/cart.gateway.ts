import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { CartService } from './cart.service';
import { CartUpdateDto } from './dto/cart-update.dto';

@WebSocketGateway({ namespace: 'cart' })
export class CartGateway {
  constructor(private readonly cartService: CartService) {}

  @SubscribeMessage('updateCart')
  update(@MessageBody() cartUpdateDto: CartUpdateDto) {
    return this.cartService.update(cartUpdateDto);
  }
}
