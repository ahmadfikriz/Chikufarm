/* eslint-disable prettier/prettier */
import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersModule } from './user/users.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { LoggerModule } from 'nestjs-pino';
import configuration from './config/configuration';
import { RoleModule } from './user/role/role.module';
import { AuthModule } from './auth/auth.module';
import { TransaksiAgenModule } from './transaksi/transaksi_agen/transaksi_agen.module';
import { TransaksiPembeliModule } from './transaksi/transaksi_pembeli/transaksi_pembeli.module';
import { RequestModule } from './transaksi/request/request.module';
import { CartModule } from './transaksi/cart/cart.module';
import { BankModule } from './transaksi/bank/bank.module';
import { ProdukAgenModule } from './produk/produk_agen/produk_agen.module';
import { ProdukPusatModule } from './produk/produk_pusat/produk_pusat.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req) => {
          return req['x-correlation-id'];
        },
        redact: {
          paths: [
            'req.headers.authorization',
            'req.headers["user-agent"]',
            'req.headers.accept',
            'req.headers["accept-encoding"]',
            'req.headers["accept-language"]',
            'req.headers.host',
            'req.headers.connection',
            'req.headers.cookie',
            'req.headers["sec-ch-ua"]',
            'req.headers["sec-ch-ua-mobile"]',
            'req.headers["sec-ch-ua-platform"]',
            'req.headers["upgrade-insecure-requests"]',
            'req.headers["sec-fetch-site"]',
            'req.headers["sec-fetch-mode"]',
            'req.headers["sec-fetch-user"]',
            'req.headers["sec-fetch-dest"]',
            'req.headers["if-none-match"]',
          ],
          remove: true,
        },
      },
    }),
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_CLIENT: Joi.valid('mysql', 'postgres'),
        DATABASE_HOST: Joi.string(),
        DATABASE_NAME: Joi.string(),
        DATABASE_USERNAME: Joi.string(),
        DATABASE_PASSWORD: Joi.string().empty('').default(''),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<'postgres' | 'mysql'>('database.client'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          entities: [],
          synchronize: true,
          autoLoadEntities: true,
          logging: false,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      inject: [ConfigService],
    }),
    RoleModule,
    UsersModule,
    ProdukAgenModule,
    AuthModule,
    TransaksiAgenModule,
    TransaksiPembeliModule,
    RequestModule,
    CartModule,
    BankModule,
    ProdukPusatModule,
    FileModule,
  ],
})
export class AppModule {}
