import { PartialType } from '@nestjs/swagger';
import { CreateTransaksiAgenDto } from './create-transaksi_agen.dto';

export class UpdateTransaksiAgenDto extends PartialType(
  CreateTransaksiAgenDto,
) {}
