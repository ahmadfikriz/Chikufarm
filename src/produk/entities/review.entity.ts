/* eslint-disable prettier/prettier */
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { produkAgen } from './produk_agen.entity';
import { produkPusat } from './produk_pusat.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rating: number;

  @Column()
  komentar: string;

  @ManyToOne(() => User, (user) => user.id)
  pembeli: User;

  @ManyToOne(() => User, (user) => user.id)
  agen: User;

  @ManyToOne(() => produkPusat, (produkPusat) => produkPusat.id)
  produkPusat: produkPusat;

  @ManyToOne(() => produkAgen, (produkAgen) => produkAgen.id)
  produkAgen: produkAgen;
}
