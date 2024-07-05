import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { PairPrice } from './entities/pair-price.entity';
import { EntityManager } from '@mikro-orm/core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PairPricesService {
  private readonly logger = new Logger(PairPricesService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly em: EntityManager, // Inject EntityManager
  ) {}

  @Cron('*/10 * * * * *')
  async handleCron() {
    const symbol = 'eur';
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${symbol}`,
        ),
      );
      const price = response.data.bitcoin[symbol];

      this.logger.debug(`Bitcoin current price: ${price}`);

      // Use a forked EntityManager instance
      const forkedEm = this.em.fork();

      const pairPrice = new PairPrice();
      pairPrice.timestamp = new Date();
      pairPrice.price = price;

      await forkedEm.persistAndFlush(pairPrice);
    } catch (error) {
      this.logger.error(
        `Error fetching Bitcoin price: ${JSON.stringify(error)}`,
      );
    }
  }
}
