import { Module } from '@nestjs/common';
import { PairPricesService } from './pair-prices.service';
import { PairPricesController } from './pair-prices.controller';
import { HttpModule } from '@nestjs/axios';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PairPrice } from './entities/pair-price.entity';

@Module({
  imports: [HttpModule, MikroOrmModule.forFeature([PairPrice])],
  providers: [PairPricesService],
  controllers: [PairPricesController],
})
export class PairPricesModule {}
