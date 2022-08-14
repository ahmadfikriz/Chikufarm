/* eslint-disable prettier/prettier */
import { produkAgen } from 'src/produk/entities/produk_agen.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { cart } from './cart.entity';

@Entity()
export class transaksi_pembeli {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  total_bayar: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  tanggal: Date;

  @Column()
  bank: string;

  @Column()
  bukti_bayar: string;

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

  @ManyToOne(() => User, (id_pembeli) => id_pembeli.id)
  pembeli: User;

  @ManyToOne(() => cart, (id_cart) => id_cart.id)
  cart: cart;

  @ManyToOne(() =>produkAgen, (id_produkAgen) =>id_produkAgen.id)
  produkAgen: produkAgen;
}
