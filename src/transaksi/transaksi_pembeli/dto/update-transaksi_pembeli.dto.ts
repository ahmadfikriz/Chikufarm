import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { StatusTransaksiPembeli } from 'src/transaksi/entities/transaksi_pembeli.entity';
import { CreateTransaksiPembeliDto } from './create-transaksi_pembeli.dto';

export class UpdateTransaksiPembeliDto {
  @IsOptional()
  no_rekening: string;

  @IsOptional()
  total_bayar: number;

  @IsOptional()
  bukti_bayar: string;

  @ApiProperty({
    type: 'enum',
    enum: StatusTransaksiPembeli,
    default: StatusTransaksiPembeli.DONE,
  })
  @IsOptional()
  status: StatusTransaksiPembeli;
}
