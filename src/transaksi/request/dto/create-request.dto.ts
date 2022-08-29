/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StatusRequest } from 'src/transaksi/entities/request.entity';

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

  @IsOptional()
  status: StatusRequest
}