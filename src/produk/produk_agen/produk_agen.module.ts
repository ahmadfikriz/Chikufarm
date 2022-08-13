import { Module } from '@nestjs/common';
import { ProdukAgenService } from './produk_agen.service';
import { ProdukAgenController } from './produk_agen.controller';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { request } from 'src/transaksi/entities/request.entity';
import { cart } from 'src/transaksi/entities/cart.entity';
import { cart_detail } from 'src/transaksi/entities/cart_detail.entity';
import { transaksi_agen } from 'src/transaksi/entities/transaksi_agen.entity';
import { transaksi_pembeli } from 'src/transaksi/entities/transaksi_pembeli.entity';
import { role } from 'src/user/entities/role.entity';
import { produkAgen } from '../entities/produk_agen.entity';
import { produkPusat } from '../entities/produk_pusat.entity';
import { UsersModule } from 'src/user/users.module';

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
    ]),
    UsersModule,
  ],
  controllers: [ProdukAgenController],
  providers: [ProdukAgenService],
  exports: [ProdukAgenService],
})
export class ProdukAgenModule {}
