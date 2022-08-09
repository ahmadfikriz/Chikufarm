import { Test, TestingModule } from '@nestjs/testing';
import { TransaksiAgenService } from './transaksi_agen.service';

describe('TransaksiAgenService', () => {
  let service: TransaksiAgenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransaksiAgenService],
    }).compile();

    service = module.get<TransaksiAgenService>(TransaksiAgenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
