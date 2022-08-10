/* eslint-disable prettier/prettier */
import { cart_detail } from 'src/transaksi/entities/cart_detail.entity';
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
  nama: string;

  @Column()
  deskripsi: string;

  @Column()
  harga: string;

  @Column()
  stok: string;

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
  agent: User;

  @OneToMany(() => cart_detail, (id_produkAgen) => id_produkAgen.id)
  produkAgen: cart_detail;
}
