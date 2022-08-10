/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransaksiPembeliDto {
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
