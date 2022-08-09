/* eslint-disable prettier/prettier */
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { request } from './request.entity';

@Entity()
export class transaksi_agen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  total_bayar: string;

  @Column()
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

  @ManyToOne(() => User, (idtransaksi_agen) => idtransaksi_agen.id)
  agent: User;

  @ManyToOne(() => request, (id_request) => id_request.id)
  request: request;
}
