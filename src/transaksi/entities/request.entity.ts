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
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { request_detail } from './request_detail.entity';
import { transaksi_agen } from './transaksi_agen.entity';

@Entity()
export class request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  agent: User;

  @OneToMany(() => request_detail, (id_request) => id_request.id)
  request_detail: request_detail;

  @OneToMany(() => transaksi_agen, (id_request) => id_request.id)
  transaksi_agen: transaksi_agen;
}
