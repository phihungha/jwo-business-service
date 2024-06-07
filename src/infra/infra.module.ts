import { Global, Module } from '@nestjs/common';

import { DbClient } from './db-client.service';

@Global()
@Module({
  providers: [
    {
      provide: DbClient,
      useClass: DbClient,
    },
  ],
  exports: [DbClient],
})
export class InfraModule {}
