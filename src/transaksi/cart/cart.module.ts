import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { request } from '../entities/request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { produkAgen } from 'src/produk/entities/produk_agen.entity';
import { produkPusat } from 'src/produk/entities/produk_pusat.entity';
import { role } from 'src/user/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { cart } from '../entities/cart.entity';
import { transaksi_agen } from '../entities/transaksi_agen.entity';
import { transaksi_pembeli } from '../entities/transaksi_pembeli.entity';
import { bank } from '../entities/bank.entity';
import { UsersModule } from 'src/user/users.module';
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
    ProdukAgenModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
