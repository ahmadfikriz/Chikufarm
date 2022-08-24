import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProdukPusatDto {
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
  @IsNumber()
  harga: number;
}
