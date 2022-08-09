import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { transaksi_pembeli } from 'src/transaksi/entities/transaksi_pembeli.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateTransaksiPembeliDto } from './dto/create-transaksi_pembeli.dto';
import { UpdateTransaksiPembeliDto } from './dto/update-transaksi_pembeli.dto';

@Injectable()
export class TransaksiPembeliService {
  constructor(
    @InjectRepository(transaksi_pembeli)
    private transaksiPembeliRepository: Repository<transaksi_pembeli>,
  ) {}

  async create(createTransaksiPembeliDto: CreateTransaksiPembeliDto) {
    const result = await this.transaksiPembeliRepository.insert(
      createTransaksiPembeliDto,
    );

    return this.transaksiPembeliRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.transaksiPembeliRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.transaksiPembeliRepository.findOneOrFail({
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

  async update(
    id: string,
    updateTransaksiPembeliDto: UpdateTransaksiPembeliDto,
  ) {
    try {
      await this.transaksiPembeliRepository.findOneOrFail({
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

    await this.transaksiPembeliRepository.update(id, updateTransaksiPembeliDto);

    return this.transaksiPembeliRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.transaksiPembeliRepository.findOneOrFail({
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

    await this.transaksiPembeliRepository.delete(id);
  }
}
