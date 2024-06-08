import { Prisma } from '@prisma/client';

import { Product } from './product.entity';

export class CartItem {
  productId: number;
  product: Product;
  quantity: number;
  unitPrice: Prisma.Decimal;
  linePrice: Prisma.Decimal;
}

export type Cart = CartItem[];
