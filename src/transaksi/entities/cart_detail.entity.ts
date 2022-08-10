/* eslint-disable prettier/prettier */
import { produkAgen } from 'src/produk/entities/produk_agen.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
  } from 'typeorm';
import { cart } from './cart.entity';
  
  @Entity()
  export class cart_detail {
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

    @ManyToOne(() =>cart, (id_cart) =>id_cart.id)
    cart: cart;

    @ManyToOne(() =>produkAgen, (id_produkAgen) =>id_produkAgen.id)
    produkAgen: produkAgen;
  }
