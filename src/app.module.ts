import { Module } from '@nestjs/common';

import { CartModule } from './cart/cart.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [InfraModule, CartModule],
})
export class AppModule {}
