/* eslint-disable prettier/prettier */
import { produkPusat } from 'src/produk/entities/produk_pusat.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { transaksi_agen } from './transaksi_agen.entity';

export enum StatusRequest {
  UNPAID = 'Menunggu Pembayaran',
  DONE = 'Selesai',
}

@Entity()
export class request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  jumlah_produk: number;
  
  @Column()
  total_harga: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  tanggal: Date;

  @Column({
    type: 'enum',
    enum: StatusRequest,
    default: StatusRequest.UNPAID,
  })
  status: StatusRequest;

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

  @ManyToOne(()=>User, user=>user.id)
  agen: User;

  @ManyToOne(() => produkPusat, (id_produkPusat) => id_produkPusat.id)
  produkPusat: produkPusat;

  @OneToMany(() => transaksi_agen, (id_request) => id_request.id)
  transaksi_agen: transaksi_agen;
}
