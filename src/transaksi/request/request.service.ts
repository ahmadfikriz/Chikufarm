/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ProdukPusatService } from 'src/produk/produk_pusat/produk_pusat.service';
import { UsersService } from 'src/user/users.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { request } from '../entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(request)
    private requestRepository: Repository<request>,
    private usersService: UsersService,
    private produkPusatService: ProdukPusatService,
  ) {}

  async create(createRequestDto: CreateRequestDto) {
    console.log(createRequestDto)
    const newRequest = new request();
    newRequest.jumlah_produk = createRequestDto.jumlah_produk
    newRequest.total_harga = createRequestDto.harga_produk * createRequestDto.jumlah_produk
    newRequest.agen = await this.usersService.findByUser(createRequestDto.email)
    newRequest.produkPusat = await this.produkPusatService.findByProdukPusat(createRequestDto.nama_produk)

    const result = await this.requestRepository.insert(newRequest)
     
    return this.requestRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },relations: ['produkPusat', 'agen']
    });
  }

//   findAll() {
//     return this.requestRepository.findAndCount({
//     where: {},relations: ['produkPusat', 'agen']
//   });
// }

async findAll(options: IPaginationOptions): Promise<Pagination<request>> {
  const queryBuilder = this.requestRepository.createQueryBuilder('request')
  .innerJoinAndSelect('request.agen', 'nama')
  .innerJoinAndSelect('request.produkPusat', 'nama_produk')
  .orderBy('request.tanggal', 'ASC');

  return paginate<request>(queryBuilder, options);
}

async findRequest(
  options: IPaginationOptions,
  search: string,
  ): Promise<Pagination<request>> {
    const query = this.requestRepository.createQueryBuilder('request')
    .innerJoinAndSelect('request.agen', 'user')
    .innerJoinAndSelect('request.produkPusat', 'produkPusat')
    .orderBy('request.tanggal', 'ASC');

    if(search)(
      query
        .where('user.nama LIKE :search', {search: `%${search}%`})
        .orWhere('produkPusat.nama_produk LIKE :search', {search: `%${search}%`})
        // .orWhere('request.status = :search', {search})
    )

    else(
      query.getMany()
    )
    await query.getMany()
    return paginate<request>(query, options)
  }

  async findOne(id: string) {
    try {
      return await this.requestRepository.findOneOrFail({
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

  async update(id: string, updateRequestDto: UpdateRequestDto) {
    try {
      await this.requestRepository.findOneOrFail({
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

    await this.requestRepository.update(id, updateRequestDto);

    return this.requestRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.requestRepository.findOneOrFail({
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

    await this.requestRepository.delete(id);
  }

  async findByRequest(id: string) {
    try {
      return await this.requestRepository.findOneOrFail({
        where: {
          id,
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

  async findByIdAgen(id: string) {
    try {
      return await this.requestRepository.findAndCount({
        relations: {
          agen: true,
        },
        where: {
          agen: {
            id,
          },
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
}
