import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { StatusRequest } from 'src/transaksi/entities/request.entity';
import { CreateRequestDto } from './create-request.dto';

export class UpdateRequestDto {
  @ApiProperty({ required: true })
  @IsOptional()
  @IsNumber()
  jumlah_produk: number;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsNumber()
  harga_produk: number;

  @ApiProperty({
    type: 'enum',
    enum: StatusRequest,
    default: StatusRequest.DONE,
  })
  @IsOptional()
  status: StatusRequest;
}
