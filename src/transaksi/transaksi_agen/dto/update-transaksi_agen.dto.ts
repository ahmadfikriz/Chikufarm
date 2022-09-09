import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { StatusTransaksiAgen } from 'src/transaksi/entities/transaksi_agen.entity';
import { CreateTransaksiAgenDto } from './create-transaksi_agen.dto';

export class UpdateTransaksiAgenDto {
  @IsOptional()
  no_rekening: string;

  @IsOptional()
  total_bayar: number;

  @IsOptional()
  bukti_bayar: string;

  @ApiProperty({
    type: 'enum',
    enum: StatusTransaksiAgen,
    default: StatusTransaksiAgen.DONE,
  })
  @IsOptional()
  status: StatusTransaksiAgen;
}
