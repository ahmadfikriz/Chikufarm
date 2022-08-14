/* eslint-disable prettier/prettier */
import { produkAgen } from 'src/produk/entities/produk_agen.entity';
import { User } from 'src/user/entities/user.entity';
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
import { transaksi_pembeli } from './transaksi_pembeli.entity';
  
  @Entity()
  export class cart {
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
    pembeli: User;

    @ManyToOne(() =>produkAgen, (id_produkAgen) =>id_produkAgen.id)
    produkAgen: produkAgen;

    @OneToMany(() => transaksi_pembeli, (id_cart) => id_cart.id)
    transaksi_pembeli: transaksi_pembeli;
  }
