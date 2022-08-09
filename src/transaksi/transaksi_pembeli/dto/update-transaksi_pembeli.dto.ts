import { PartialType } from '@nestjs/swagger';
import { CreateTransaksiPembeliDto } from './create-transaksi_pembeli.dto';

export class UpdateTransaksiPembeliDto extends PartialType(CreateTransaksiPembeliDto) {}
