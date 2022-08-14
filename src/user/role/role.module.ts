/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { role } from '../entities/role.entity';
import { produkPusat } from 'src/produk/entities/produk_pusat.entity';
import { produkAgen } from 'src/produk/entities/produk_agen.entity';
import { bank } from 'src/transaksi/entities/bank.entity';
import { request } from 'src/transaksi/entities/request.entity';
import { cart } from 'src/transaksi/entities/cart.entity';
import { transaksi_agen } from 'src/transaksi/entities/transaksi_agen.entity';
import { transaksi_pembeli } from 'src/transaksi/entities/transaksi_pembeli.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      role,
      produkPusat,
      produkAgen,
      bank,
      request,
      cart,
      transaksi_agen,
      transaksi_pembeli,
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
