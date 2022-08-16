/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
import { role } from './role.entity';
import { produkAgen } from 'src/produk/entities/produk_agen.entity';
import { bank } from 'src/transaksi/entities/bank.entity';
import { cart } from 'src/transaksi/entities/cart.entity';
import { request } from 'src/transaksi/entities/request.entity';
import { transaksi_agen } from 'src/transaksi/entities/transaksi_agen.entity';
import { transaksi_pembeli } from 'src/transaksi/entities/transaksi_pembeli.entity';
import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
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

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nama: string;

  @Column({unique:true})
  email: string;

  @Column()
  password: string;

  @Column()
  no_hp: string;

  @Column()
  alamat: string;

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

  @ManyToOne(() => role, (id_role) => id_role.id)
  role: role;

  @OneToMany(() => produkAgen, (id_agen) => id_agen.id)
  produkAgen: produkAgen;

  @OneToMany(() => request, (id_agen) => id_agen.id)
  request: request;

  @OneToMany(() => transaksi_agen, (id_agen) => id_agen.id)
  transaksi_agen: transaksi_agen;

  @OneToMany(() => cart, (id_pembeli) => id_pembeli.id)
  cart: cart;

  @OneToMany(() => transaksi_pembeli, (id_pembeli) => id_pembeli.id)
  transaksi_pembeli: transaksi_pembeli;

  @OneToMany(() => bank, (id_user) => id_user.id)
  bank: bank;
  
  static password: any;
  static id: any;
  
  @BeforeInsert() 
    async setPassword(password: string){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(password || this.password, salt)
    }
}
