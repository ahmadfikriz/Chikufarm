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

@Entity()
export class request {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  jumlah_produk: string;
  
  @Column()
  total_harga: string;

  @Column()
  tanggal: Date;

  @Column()
  status: boolean;

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
