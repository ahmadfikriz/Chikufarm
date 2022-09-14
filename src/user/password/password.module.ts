import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordReset } from './entities/password.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordReset])],
  controllers: [PasswordController],
  providers: [PasswordService],
})
export class PasswordModule {}
