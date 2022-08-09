import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { role } from './entities/role.entity';
import { produk_agen } from 'src/produk/entities/produk_agen.entity';
import { produk_pusat } from 'src/produk/entities/produk_pusat.entity';
import { bank } from 'src/transaksi/entities/bank.entity';
import { cart } from 'src/transaksi/entities/cart.entity';
import { cart_detail } from 'src/transaksi/entities/cart_detail.entity';
import { request } from 'src/transaksi/entities/request.entity';
import { request_detail } from 'src/transaksi/entities/request_detail.entity';
import { transaksi_agen } from 'src/transaksi/entities/transaksi_agen.entity';
import { transaksi_pembeli } from 'src/transaksi/entities/transaksi_pembeli.entity';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      role,
      produk_pusat,
      produk_agen,
      bank,
      request,
      request_detail,
      cart,
      cart_detail,
      transaksi_agen,
      transaksi_pembeli,
    ]),
    RoleModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
