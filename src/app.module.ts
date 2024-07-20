import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CartModule } from './cart/cart.module';
import { DbClient } from './infra/db-client.service';

@Global()
@Module({
  providers: [DbClient],
  imports: [ConfigModule.forRoot({ isGlobal: true }), CartModule],
  exports: [DbClient],
})
export class AppModule {}
