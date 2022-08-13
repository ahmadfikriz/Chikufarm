import { Module } from '@nestjs/common';
import { TransaksiPembeliService } from './transaksi_pembeli.service';
import { TransaksiPembeliController } from './transaksi_pembeli.controller';
import { request } from 'src/transaksi/entities/request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { produkAgen } from 'src/produk/entities/produk_agen.entity';
import { produkPusat } from 'src/produk/entities/produk_pusat.entity';
import { cart } from 'src/transaksi/entities/cart.entity';
import { cart_detail } from 'src/transaksi/entities/cart_detail.entity';
import { transaksi_agen } from 'src/transaksi/entities/transaksi_agen.entity';
import { transaksi_pembeli } from 'src/transaksi/entities/transaksi_pembeli.entity';
import { role } from 'src/user/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { bank } from '../entities/bank.entity';
import { UsersModule } from 'src/user/users.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      role,
      produkPusat,
      produkAgen,
      request,
      cart,
      cart_detail,
      transaksi_agen,
      transaksi_pembeli,
      bank,
    ]),
    UsersModule,
    CartModule,
  ],
  controllers: [TransaksiPembeliController],
  providers: [TransaksiPembeliService],
  exports: [TransaksiPembeliService],
})
export class TransaksiPembeliModule {}
