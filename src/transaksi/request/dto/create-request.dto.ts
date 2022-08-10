/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  tanggal: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  status: boolean;
}