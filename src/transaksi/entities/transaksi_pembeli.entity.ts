/* eslint-disable prettier/prettier */
import { produkAgen } from 'src/produk/entities/produk_agen.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { bank } from './bank.entity';
import { cart } from './cart.entity';

export enum StatusTransaksiPembeli {
  WAIT = 'Menunggu Konfirmasi',
  REJECT = 'Ditolak',
  DONE = 'Selesai',
}

@Entity()
export class transaksi_pembeli {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  jumlah_produk: number;

  @Column()
  total_bayar: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  tanggal: Date;

  @Column()
  bukti_bayar: string;

  @Column({
    type: 'enum',
    enum: StatusTransaksiPembeli,
    default: StatusTransaksiPembeli.WAIT,
  })
  status: StatusTransaksiPembeli;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deleted_at: Date;

  @ManyToOne(() => User, (id_pembeli) => id_pembeli.id)
  pembeli: User;

  @ManyToOne(() => bank, (id_bank) => id_bank.id)
  bank: bank;

  @ManyToOne(() => cart, {onDelete: 'SET NULL'})
  cart: cart;

  @ManyToOne(() =>produkAgen, (id_produkAgen) =>id_produkAgen.id)
  produkAgen: produkAgen;
}
