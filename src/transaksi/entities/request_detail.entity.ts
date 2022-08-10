/* eslint-disable prettier/prettier */
import { produkPusat } from 'src/produk/entities/produk_pusat.entity';
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
    jumlah_produkAgen: string;
  
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

    @ManyToOne(() => produkPusat, (id_produkPusat) => id_produkPusat.id)
    produkPusat: produkPusat;

    @ManyToOne(() => request, (id_request) => id_request.id)
    request: request;
  }