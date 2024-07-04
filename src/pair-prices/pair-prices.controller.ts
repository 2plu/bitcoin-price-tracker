import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PairPrice } from './entities/pair-price.entity';
import { EntityRepository } from '@mikro-orm/core';

@Controller('pair-prices')
export class PairPricesController {
  constructor(
    @InjectRepository(PairPrice)
    private readonly pairPriceRepository: EntityRepository<PairPrice>,
  ) {}

  @Get()
  async findAll() {
    return await this.pairPriceRepository.findAll();
  }
}
