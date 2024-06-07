import { PrismaClient } from '@prisma/client';

const dbClient = new PrismaClient();

async function main() {
  await dbClient.product.createMany({
    data: [
      { id: 1, name: 'Phone', imageUrl: '', price: 5_000_000 },
      { id: 2, name: 'Ball', imageUrl: '', price: 30_000 },
      { id: 3, name: 'Scissor', imageUrl: '', price: 20_000 },
    ],
  });

  await dbClient.cartItem.createMany({
    data: [
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 2 },
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
