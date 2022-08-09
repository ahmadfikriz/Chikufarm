/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTransaksiPembeliDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  id_cart: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  id_pembeli: string;

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

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  bukti_bayar: string;
}
