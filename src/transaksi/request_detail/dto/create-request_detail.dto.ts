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
  id_produkPusat: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  jumlah_produkAgen: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  total_harga: string;
}
