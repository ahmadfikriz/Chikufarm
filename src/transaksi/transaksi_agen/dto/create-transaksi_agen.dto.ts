/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransaksiAgenDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  nama_agen: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  total_bayar: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  tanggal: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  bank: string;

  @ApiProperty({ format:'binary' })
  @IsOptional()
  bukti_bayar: string;
}
