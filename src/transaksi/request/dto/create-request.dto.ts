/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateRequestDto {
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
  @IsNumber()
  jumlah_produk: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  harga_produk: number;
}