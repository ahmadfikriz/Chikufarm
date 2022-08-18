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
  email_pembeli: string;

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
  total_bayar: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  bank: string;

  @ApiProperty({ format:'binary' })
  @IsOptional()
  bukti_bayar: string;
}
