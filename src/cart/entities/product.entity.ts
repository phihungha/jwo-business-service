import { Prisma } from '@prisma/client';

export class Product {
  id: number;
  name: string;
  imageUrl: string;
  price: Prisma.Decimal;
}
