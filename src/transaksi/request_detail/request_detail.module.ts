import { Module } from '@nestjs/common';
import { RequestDetailService } from './request_detail.service';
import { RequestDetailController } from './request_detail.controller';
import { request } from '../entities/request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { produk_agen } from 'src/produk/entities/produk_agen.entity';
import { produk_pusat } from 'src/produk/entities/produk_pusat.entity';
import { role } from 'src/user/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { cart } from '../entities/cart.entity';
import { cart_detail } from '../entities/cart_detail.entity';
import { request_detail } from '../entities/request_detail.entity';
import { transaksi_agen } from '../entities/transaksi_agen.entity';
import { transaksi_pembeli } from '../entities/transaksi_pembeli.entity';
import { bank } from '../entities/bank.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      role,
      produk_pusat,
      produk_agen,
      request,
      request_detail,
      cart,
      cart_detail,
      transaksi_agen,
      transaksi_pembeli,
      bank,
    ]),
  ],
  controllers: [RequestDetailController],
  providers: [RequestDetailService],
})
export class RequestDetailModule {}
