import { Test, TestingModule } from '@nestjs/testing';
import { TransaksiPembeliService } from './transaksi_pembeli.service';

describe('TransaksiPembeliService', () => {
  let service: TransaksiPembeliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransaksiPembeliService],
    }).compile();

    service = module.get<TransaksiPembeliService>(TransaksiPembeliService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
