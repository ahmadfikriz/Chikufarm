/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import { request } from 'src/transaksi/entities/request.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class produkPusat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nama_produk: string;

  @Column()
  deskripsi: string;

  @Column()
  harga: string;

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

  @OneToMany(() => request, (id_produkPusat) => id_produkPusat.id)
  produkPusat: request;
}
