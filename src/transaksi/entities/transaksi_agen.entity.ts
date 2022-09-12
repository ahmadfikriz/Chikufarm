/* eslint-disable prettier/prettier */
import { produkPusat } from 'src/produk/entities/produk_pusat.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { bank } from './bank.entity';
import { request } from './request.entity';

export enum StatusTransaksiAgen {
  UNPAID = 'Menunggu Konfirmasi',
  DONE = 'Selesai',
}

@Entity()
export class transaksi_agen {
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
    enum: StatusTransaksiAgen,
    default: StatusTransaksiAgen.UNPAID,
  })
  status: StatusTransaksiAgen;

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

  @ManyToOne(() => User, (id_agen) => id_agen.id)
  agen: User;

  @ManyToOne(() => bank, (id_bank) => id_bank.id)
  bank: bank;

  @ManyToOne(() => request, (id_request) => id_request.id, {onDelete: "SET NULL"})
  request: request;

  @ManyToOne(() => produkPusat, (id_produkPusat) => id_produkPusat.id)
  produkPusat: produkPusat;
}
