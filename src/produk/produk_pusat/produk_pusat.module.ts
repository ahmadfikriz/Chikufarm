import { Module } from '@nestjs/common';
import { ProdukPusatService } from './produk_pusat.service';
import { ProdukPusatController } from './produk_pusat.controller';
import { request } from 'src/transaksi/entities/request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cart } from 'src/transaksi/entities/cart.entity';
import { cart_detail } from 'src/transaksi/entities/cart_detail.entity';
import { transaksi_agen } from 'src/transaksi/entities/transaksi_agen.entity';
import { transaksi_pembeli } from 'src/transaksi/entities/transaksi_pembeli.entity';
import { role } from 'src/user/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { produkAgen } from '../entities/produk_agen.entity';
import { produkPusat } from '../entities/produk_pusat.entity';

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
  ],
  controllers: [ProdukPusatController],
  providers: [ProdukPusatService],
  exports: [ProdukPusatService],
})
export class ProdukPusatModule {}
