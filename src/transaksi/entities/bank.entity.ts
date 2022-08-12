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
  
  @Entity()
  export class bank {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nama_bank: string;
  
    @Column()
    nama_akun_bank: string;
  
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
  }
  