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
  @IsString()
  jumlah_produk: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  total_harga: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  tanggal: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  status: boolean;
}
