import { Test, TestingModule } from '@nestjs/testing';
import { TransaksiAgenController } from './transaksi_agen.controller';
import { TransaksiAgenService } from './transaksi_agen.service';

describe('TransaksiAgenController', () => {
  let controller: TransaksiAgenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransaksiAgenController],
      providers: [TransaksiAgenService],
    }).compile();

    controller = module.get<TransaksiAgenController>(TransaksiAgenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
