import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBankDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  id_user: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  nama_bank: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  nama_akun_bank: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  no_rekening: number;
}
