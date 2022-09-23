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
import { Review } from './review.entity';

@Entity()
export class produkPusat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nama_produk: string;

  @Column()
  deskripsi: string;

  @Column()
  harga: number;

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

  @OneToMany(()=> Review, id_produkPusat=>id_produkPusat.id)
  review: Review;
}
