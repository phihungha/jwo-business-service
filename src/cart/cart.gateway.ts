import { UsePipes } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WsValidationPipe } from 'src/ws-validation.pipe';

import { ParseJsonPipe } from '../parse-json.pipe';
import { CartService } from './cart.service';
import { CartUpdateDto } from './dto/cart-update.dto';

@WebSocketGateway({ namespace: 'cart' })
@UsePipes(ParseJsonPipe, new WsValidationPipe({ transform: true }))
export class CartGateway {
  constructor(private readonly cartService: CartService) {}

  @SubscribeMessage('updateCart')
  update(@MessageBody() body: CartUpdateDto) {
    return this.cartService.update(body);
  }
}
