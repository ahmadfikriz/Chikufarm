/* eslint-disable prettier/prettier */
import { cart } from 'src/transaksi/entities/cart.entity';
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

@Entity()
export class produkAgen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nama_produk: string;

  @Column()
  deskripsi: string;

  @Column()
  harga: number;

  @Column()
  stok: number;

  @Column()
  foto: string;

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

  @OneToMany(() => cart, (id_produkAgen) => id_produkAgen.id, {onDelete: "SET NULL"})
  produkAgen: cart;
}
