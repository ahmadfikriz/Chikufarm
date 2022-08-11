/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProdukAgenDto {
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

  @ApiProperty({ format:'binary' })
  @IsOptional()
  foto: string;
}
