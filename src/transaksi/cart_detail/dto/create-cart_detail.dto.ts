import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCartDetailDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  id_cart: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  id_produk_agen: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  jumlah_produk: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  total_harga: string;
}
