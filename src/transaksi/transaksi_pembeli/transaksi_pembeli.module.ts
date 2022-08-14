import { Module } from '@nestjs/common';
import { TransaksiPembeliService } from './transaksi_pembeli.service';
import { TransaksiPembeliController } from './transaksi_pembeli.controller';
import { request } from 'src/transaksi/entities/request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { produkAgen } from 'src/produk/entities/produk_agen.entity';
import { produkPusat } from 'src/produk/entities/produk_pusat.entity';
import { cart } from 'src/transaksi/entities/cart.entity';
import { transaksi_agen } from 'src/transaksi/entities/transaksi_agen.entity';
import { transaksi_pembeli } from 'src/transaksi/entities/transaksi_pembeli.entity';
import { role } from 'src/user/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { bank } from '../entities/bank.entity';
import { UsersModule } from 'src/user/users.module';
import { CartModule } from '../cart/cart.module';
import { ProdukAgenModule } from 'src/produk/produk_agen/produk_agen.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      role,
      produkPusat,
      produkAgen,
      request,
      cart,
      transaksi_agen,
      transaksi_pembeli,
      bank,
    ]),
    UsersModule,
    CartModule,
    ProdukAgenModule,
  ],
  controllers: [TransaksiPembeliController],
  providers: [TransaksiPembeliService],
  exports: [TransaksiPembeliService],
})
export class TransaksiPembeliModule {}
