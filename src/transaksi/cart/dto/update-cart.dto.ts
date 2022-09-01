import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { StatusCart } from 'src/transaksi/entities/cart.entity';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto {
  @ApiProperty({ required: true })
  @IsOptional()
  @IsNumber()
  jumlah_produk: number;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsNumber()
  total_harga: number;

  @ApiProperty({
    type: 'enum',
    enum: StatusCart,
    default: StatusCart.DONE,
  })
  @IsOptional()
  status: StatusCart;
}
