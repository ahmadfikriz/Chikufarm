/* eslint-disable prettier/prettier */
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
import { cart_detail } from './cart_detail.entity';
import { transaksi_pembeli } from './transaksi_pembeli.entity';
  
  @Entity()
  export class cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nama: string;
  
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

    @OneToMany(() => cart_detail, (id_cart) => id_cart.id)
    cart_detail: cart_detail;

    @OneToMany(() => transaksi_pembeli, (id_cart) => id_cart.id)
    transaksi_pembeli: transaksi_pembeli;
  }
