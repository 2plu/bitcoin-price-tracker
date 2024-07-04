import { Test, TestingModule } from '@nestjs/testing';
import { PairPricesService } from './pair-prices.service';

describe('PairPricesService', () => {
  let service: PairPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PairPricesService],
    }).compile();

    service = module.get<PairPricesService>(PairPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
