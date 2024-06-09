import { PrismaClient } from '@prisma/client';

const dbClient = new PrismaClient();

async function main() {
  await dbClient.product.createMany({
    data: [
      { id: 32, name: 'Ball', imageUrl: '', price: 35_000 },
      { id: 42, name: 'Fork', imageUrl: '', price: 15_000 },
      { id: 67, name: 'Phone', imageUrl: '', price: 5_000_000 },
      { id: 73, name: 'Book', imageUrl: '', price: 50_000 },
      { id: 76, name: 'Scissor', imageUrl: '', price: 20_000 },
      { id: 79, name: 'Toothbrush', imageUrl: '', price: 13_000 },
    ],
  });

  await dbClient.cartItem.createMany({
    data: [
      { productId: 67, quantity: 1 },
      { productId: 79, quantity: 2 },
    ],
  });
}

main()
  .then(async () => {
    await dbClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await dbClient.$disconnect();
    process.exit(1);
  });
