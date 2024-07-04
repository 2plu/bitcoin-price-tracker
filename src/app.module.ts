import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PairPricesModule } from './pair-prices/pair-prices.module';
import mikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    MikroOrmModule.forRoot(mikroOrmConfig),
    PairPricesModule,
  ],
})
export class AppModule {}
