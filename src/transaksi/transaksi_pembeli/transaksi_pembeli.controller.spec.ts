import { Test, TestingModule } from '@nestjs/testing';
import { TransaksiPembeliController } from './transaksi_pembeli.controller';
import { TransaksiPembeliService } from './transaksi_pembeli.service';

describe('TransaksiPembeliController', () => {
  let controller: TransaksiPembeliController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransaksiPembeliController],
      providers: [TransaksiPembeliService],
    }).compile();

    controller = module.get<TransaksiPembeliController>(
      TransaksiPembeliController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
