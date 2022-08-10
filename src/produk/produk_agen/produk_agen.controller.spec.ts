import { Test, TestingModule } from '@nestjs/testing';
import { ProdukAgenController } from './produk_agen.controller';
import { ProdukAgenService } from './produk_agen.service';

describe('ProdukAgenController', () => {
  let controller: ProdukAgenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdukAgenController],
      providers: [ProdukAgenService],
    }).compile();

    controller = module.get<ProdukAgenController>(ProdukAgenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
