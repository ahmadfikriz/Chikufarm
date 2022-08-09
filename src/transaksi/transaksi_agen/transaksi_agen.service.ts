import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { transaksi_agen } from '../entities/transaksi_agen.entity';
import { CreateTransaksiAgenDto } from './dto/create-transaksi_agen.dto';
import { UpdateTransaksiAgenDto } from './dto/update-transaksi_agen.dto';

@Injectable()
export class TransaksiAgenService {
  constructor(
    @InjectRepository(transaksi_agen)
    private transaksiAgenRepository: Repository<transaksi_agen>,
  ) {}

  async create(createTransaksiAgenDto: CreateTransaksiAgenDto) {
    const result = await this.transaksiAgenRepository.insert(
      createTransaksiAgenDto,
    );

    return this.transaksiAgenRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.transaksiAgenRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.transaksiAgenRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  async update(id: string, updateTransaksiAgenDto: UpdateTransaksiAgenDto) {
    try {
      await this.transaksiAgenRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    await this.transaksiAgenRepository.update(id, updateTransaksiAgenDto);

    return this.transaksiAgenRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.transaksiAgenRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    await this.transaksiAgenRepository.delete(id);
  }
}
