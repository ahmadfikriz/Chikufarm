/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProdukAgenDto {
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
  deskripsi: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  harga: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  stok: number;

  @ApiProperty({ format:'binary' })
  @IsOptional()
  foto: string;
}
