import { Test, TestingModule } from '@nestjs/testing';
import { ProdukAgenService } from './produk_agen.service';

describe('ProdukAgenService', () => {
  let service: ProdukAgenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdukAgenService],
    }).compile();

    service = module.get<ProdukAgenService>(ProdukAgenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
