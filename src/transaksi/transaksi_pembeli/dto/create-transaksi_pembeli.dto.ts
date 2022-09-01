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
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  nama_produk: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  id_cart: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  no_rekening: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  total_bayar: number;

  @ApiProperty({ format:'binary' })
  @IsOptional()
  bukti_bayar: string;
}
