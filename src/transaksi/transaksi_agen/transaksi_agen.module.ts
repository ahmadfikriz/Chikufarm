import { Module } from '@nestjs/common';
import { TransaksiAgenService } from './transaksi_agen.service';
import { TransaksiAgenController } from './transaksi_agen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { role } from 'src/user/entities/role.entity';
import { produk_pusat } from 'src/produk/entities/produk_pusat.entity';
import { produk_agen } from 'src/produk/entities/produk_agen.entity';
import { request } from '../entities/request.entity';
import { request_detail } from '../entities/request_detail.entity';
import { cart } from '../entities/cart.entity';
import { cart_detail } from '../entities/cart_detail.entity';
import { transaksi_agen } from '../entities/transaksi_agen.entity';
import { transaksi_pembeli } from '../entities/transaksi_pembeli.entity';
import { bank } from '../entities/bank.entity';
import { UsersModule } from 'src/user/users.module';

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
    UsersModule,
  ],
  controllers: [TransaksiAgenController],
  providers: [TransaksiAgenService],
})
export class TransaksiAgenModule {}
