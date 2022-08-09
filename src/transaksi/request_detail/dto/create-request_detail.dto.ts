import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestDetailDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  id_request: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  id_produk_pusat: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  jumlah_produk: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  total_harga: string;
}
