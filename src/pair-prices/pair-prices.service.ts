import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PairPrice } from './entities/pair-price.entity';
import { EntityManager } from '@mikro-orm/core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PairPricesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly em: EntityManager, // Adjusted here to inject EntityManager
  ) {}

  @Cron('*/10 * * * * *')
  async handleCron() {
    try {
      const response = await firstValueFrom(this.httpService.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur'));
      const price = response.data.bitcoin.eur;

      console.log('Bitcoin current price: ', price)
      
      // Use a forked EntityManager instance
      const forkedEm = this.em.fork();

      const pairPrice = new PairPrice();
      pairPrice.timestamp = new Date();
      pairPrice.price = price;

      await forkedEm.persistAndFlush(pairPrice);
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
    }
  }
}
