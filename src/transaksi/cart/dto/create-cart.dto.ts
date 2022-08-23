import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  nama_pembeli: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  nama_produk: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  jumlah_produk: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  harga_produk: number;
}
