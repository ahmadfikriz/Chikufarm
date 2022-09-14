import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class PasswordReset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ unique: true })
  token: string;
}
