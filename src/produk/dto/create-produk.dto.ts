/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateProdukDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  transaksi_agen: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  nama: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  deskripsi: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  harga: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  stok: string;
}
