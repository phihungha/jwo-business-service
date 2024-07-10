import { PrismaClient } from '@prisma/client';

const dbClient = new PrismaClient();

async function main() {
  await dbClient.product.createMany({
    data: [
      {
        id: 0,
        name: 'Alpenliebe Jelly',
        imageUrl:
          'https://lzd-img-global.slatic.net/g/p/04c554ff4ef2678371fda7f5748009a0.png_320x320.png_550x550.png',
        price: 10_000,
      },
      {
        id: 1,
        name: 'Poca Fish Skin Peanut',
        imageUrl:
          'https://pvmarthanoi.com.vn/wp-content/uploads/2023/07/2-500x500.jpg',
        price: 8_000,
      },
      {
        id: 2,
        name: 'Peppie Vani',
        imageUrl:
          'https://salt.tikicdn.com/cache/w1200/ts/product/2c/d6/d2/dcaa7e31339e30ffd7531b91f93b1520.jpg',
        price: 5_000,
      },
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
