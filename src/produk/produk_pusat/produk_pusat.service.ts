/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository, EntityNotFoundError } from 'typeorm';
import { produkPusat } from '../entities/produk_pusat.entity';
import { CreateProdukPusatDto } from './dto/create-produk_pusat.dto';
import { UpdateProdukPusatDto } from './dto/update-produk_pusat.dto';

@Injectable()
export class ProdukPusatService {
  constructor(
    @InjectRepository(produkPusat)
    private produkPusatRepository: Repository<produkPusat>,
  ) {}

  async create(createProdukPusatDto: CreateProdukPusatDto) {
    const result = await this.produkPusatRepository.insert(
      createProdukPusatDto,
    );

    return this.produkPusatRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<produkPusat>> {
    const queryBuilder = this.produkPusatRepository.createQueryBuilder('produkPusat')
    .orderBy('produkPusat.nama_produk', 'ASC');
  
    return paginate<produkPusat>(queryBuilder, options);
  }

  async findProduk(
    options: IPaginationOptions,
    search: string,
    ): Promise<Pagination<produkPusat>> {
      const query = this.produkPusatRepository.createQueryBuilder('produkPusat')
      .orderBy('produkPusat.nama_produk', 'ASC');
  
      if(search)(
        query
          .where('produkPusat.nama_produk LIKE :search', {search: `%${search}%`})
      )
      else(
        query.getMany()
      )
      await query.getMany()
      return paginate<produkPusat>(query, options)
    }

  async findOne(id: string) {
    try {
      return await this.produkPusatRepository.findOneOrFail({
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

  async update(id: string, updateProdukPusatDto: UpdateProdukPusatDto) {
    try {
      await this.produkPusatRepository.findOneOrFail({
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

    await this.produkPusatRepository.update(id, updateProdukPusatDto);

    return this.produkPusatRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.produkPusatRepository.findOneOrFail({
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

    await this.produkPusatRepository.delete(id);
  }

  async findByProdukPusat(nama_produk: string) {
    try {
      return await this.produkPusatRepository.findOneOrFail({
        where: {
          nama_produk,
        },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }
}
