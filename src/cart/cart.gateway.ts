import { UsePipes } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsValidationPipe } from 'src/ws-validation.pipe';

import { CartService } from './cart.service';
import { CartUpdateDto } from './dtos/cart-update.dto';

@WebSocketGateway({ namespace: 'cart' })
@UsePipes(new WsValidationPipe({ transform: true }))
export class CartGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private readonly cartService: CartService) {}

  @SubscribeMessage('get')
  async get(@ConnectedSocket() socket: Socket) {
    socket.join('get');
    const cart = await this.cartService.get();
    socket.emit('updated', cart);
    return 'Begin getting latest cart.';
  }

  @SubscribeMessage('update')
  async update(@MessageBody() body: CartUpdateDto) {
    const cart = await this.cartService.update(body);
    this.server.to('get').emit('updated', cart);
    return 'Succeed';
  }

  @SubscribeMessage('clear')
  async clear() {
    const cart = await this.cartService.clear();
    this.server.to('get').emit('updated', cart);
    return 'Succeed';
  }
}
