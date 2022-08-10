import { Test, TestingModule } from '@nestjs/testing';
import { ProdukPusatService } from './produk_pusat.service';

describe('ProdukPusatService', () => {
  let service: ProdukPusatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdukPusatService],
    }).compile();

    service = module.get<ProdukPusatService>(ProdukPusatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
