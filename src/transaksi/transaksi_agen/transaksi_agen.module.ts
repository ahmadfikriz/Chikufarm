import { Module } from '@nestjs/common';
import { TransaksiAgenService } from './transaksi_agen.service';
import { TransaksiAgenController } from './transaksi_agen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { role } from 'src/user/entities/role.entity';
import { request } from '../entities/request.entity';
import { cart } from '../entities/cart.entity';
import { transaksi_agen } from '../entities/transaksi_agen.entity';
import { transaksi_pembeli } from '../entities/transaksi_pembeli.entity';
import { bank } from '../entities/bank.entity';
import { UsersModule } from 'src/user/users.module';
import { produkAgen } from 'src/produk/entities/produk_agen.entity';
import { produkPusat } from 'src/produk/entities/produk_pusat.entity';
import { RequestModule } from '../request/request.module';
import { ProdukPusatModule } from 'src/produk/produk_pusat/produk_pusat.module';
import { BankModule } from '../bank/bank.module';

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
    BankModule,
    UsersModule,
    RequestModule,
    ProdukPusatModule,
  ],
  controllers: [TransaksiAgenController],
  providers: [TransaksiAgenService],
  exports: [TransaksiAgenService],
})
export class TransaksiAgenModule {}
