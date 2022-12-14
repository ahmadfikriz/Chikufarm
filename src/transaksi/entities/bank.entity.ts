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
import { transaksi_agen } from './transaksi_agen.entity';
import { transaksi_pembeli } from './transaksi_pembeli.entity';
  
  @Entity()
  export class bank {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nama_bank: string;
  
    @Column()
    nama_akun: string;
  
    @Column()
    no_rekening: string;
  
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

    @ManyToOne(() =>User, (id_user) =>id_user.id)
    user: User;

    @OneToMany(() =>transaksi_agen, (id_transaksi_agen) =>id_transaksi_agen.id)
    transaksi_agen: transaksi_agen;

    @OneToMany(() =>transaksi_pembeli, (id_transaksi_pembeli) =>id_transaksi_pembeli.id)
    transaksi_pembeli: transaksi_pembeli;
  }
  