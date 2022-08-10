/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { produkAgen } from '../entities/produk_agen.entity';
import { CreateProdukAgenDto } from './dto/create-produk_agen.dto';
import { UpdateProdukAgenDto } from './dto/update-produk_agen.dto';

@Injectable()
export class ProdukAgenService {
  constructor(
    @InjectRepository(produkAgen)
    private produkAgenRepository: Repository<produkAgen>,
  ) {}

  async create(createProdukAgenDto: CreateProdukAgenDto) {
    const result = await this.produkAgenRepository.insert(createProdukAgenDto);

    return this.produkAgenRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.produkAgenRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.produkAgenRepository.findOneOrFail({
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

  async update(id: string, updateProdukAgenDto: UpdateProdukAgenDto) {
    try {
      await this.produkAgenRepository.findOneOrFail({
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

    await this.produkAgenRepository.update(id, updateProdukAgenDto);

    return this.produkAgenRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.produkAgenRepository.findOneOrFail({
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

    await this.produkAgenRepository.delete(id);
  }
}