import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbClient } from 'src/infra/db-client.service';

import { CartUpdateDto } from './dtos/cart-update.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(private dbClient: DbClient) {}

  async get(): Promise<Cart> {
    const items = await this.dbClient.cartItem.findMany({
      include: {
        product: true,
      },
      orderBy: { productId: 'asc' },
    });

    return items.map((i) => ({
      ...i,
      unitPrice: i.product.price,
      linePrice: i.product.price.mul(new Prisma.Decimal(i.quantity)),
    }));
  }

  async update(cartUpdateDto: CartUpdateDto): Promise<Cart> {
    const updatePromises = cartUpdateDto.items.map(async (itemDto) => {
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
    await Promise.all(updatePromises);

    return await this.get();
  }

  async clear(): Promise<Cart> {
    await this.dbClient.cartItem.deleteMany();
    return [];
  }
}
