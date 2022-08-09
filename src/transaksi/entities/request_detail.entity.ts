/* eslint-disable prettier/prettier */
import { produk_pusat } from 'src/produk/entities/produk_pusat.entity';
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
import { request } from './request.entity';
  
  @Entity()
  export class request_detail {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    jumlah_produk: string;
  
    @Column()
    total_harga: string;
  
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

    @ManyToOne(() => produk_pusat, (id_produk_pusat) => id_produk_pusat.id)
    produk_pusat: produk_pusat;

    @ManyToOne(() => request, (id_request) => id_request.id)
    request: request;
  }