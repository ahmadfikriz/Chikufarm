/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  nama_agen: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  nama_produk: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  jumlah_produk: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  total_harga: number;
}