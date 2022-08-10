import { Test, TestingModule } from '@nestjs/testing';
import { ProdukPusatController } from './produk_pusat.controller';
import { ProdukPusatService } from './produk_pusat.service';

describe('ProdukPusatController', () => {
  let controller: ProdukPusatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdukPusatController],
      providers: [ProdukPusatService],
    }).compile();

    controller = module.get<ProdukPusatController>(ProdukPusatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
