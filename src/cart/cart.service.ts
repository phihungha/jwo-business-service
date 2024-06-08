import { Injectable } from '@nestjs/common';
import { DbClient } from 'src/infra/db-client.service';

import { CartUpdateDto } from './dto/cart-update.dto';

@Injectable()
export class CartService {
  constructor(private dbClient: DbClient) {}

  async get() {
    return await this.dbClient.cartItem.findMany({
      orderBy: { productId: 'asc' },
    });
  }

  async update(cartUpdateDto: CartUpdateDto) {
    cartUpdateDto.items.forEach(async (itemDto) => {
      const updatedItem = await this.dbClient.cartItem.upsert({
        where: { productId: itemDto.productId },
        update: {
          quantity: { increment: itemDto.quantity },
        },
        create: {
          productId: itemDto.productId,
          quantity: itemDto.quantity,
        },
      });

      if (updatedItem.quantity <= 0) {
        await this.dbClient.cartItem.delete({
          where: { productId: itemDto.productId },
        });
      }
    });

    return await this.get();
  }
}
