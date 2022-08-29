import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { CreateRequestDto } from './create-request.dto';

export enum StatusRequest {
  DONE = 'Selesai',
}

export class ApproveDto {
  @IsOptional()
  @IsNumber()
  jumlah_produk: number;

  @IsOptional()
  @IsNumber()
  harga_produk: number;

  @ApiProperty({
    type: 'enum',
    enum: StatusRequest,
    default: StatusRequest.DONE,
  })
  status: StatusRequest;
}
