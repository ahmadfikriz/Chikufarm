/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdukPusatService } from 'src/produk/produk_pusat/produk_pusat.service';
import { Repository, EntityNotFoundError } from 'typeorm';
import { request_detail } from '../entities/request_detail.entity';
import { CreateRequestDetailDto } from './dto/create-request_detail.dto';
import { UpdateRequestDetailDto } from './dto/update-request_detail.dto';

@Injectable()
export class RequestDetailService {
  constructor(
    @InjectRepository(request_detail)
    private requestDetailRepository: Repository<request_detail>,
    private produkPusatService: ProdukPusatService,
  ) {}

  async create(createRequestDetailDto: CreateRequestDetailDto) {
    console.log(createRequestDetailDto)
    const newRequestDetail = new request_detail();
    newRequestDetail.jumlah_produk = createRequestDetailDto.jumlah_produk
    newRequestDetail.total_harga = createRequestDetailDto.total_harga
    newRequestDetail.produkPusat = await this.produkPusatService.findByProdukPusat(createRequestDetailDto.nama_produk)

    const result = await this.requestDetailRepository.insert(newRequestDetail)
     
      
    return this.requestDetailRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },relations: ['produkPusat']
    });
  }

  findAll() {
    return this.requestDetailRepository.findAndCount({
    where: {},relations: ['produkPusat']
  });
}

  async findOne(id: string) {
    try {
      return await this.requestDetailRepository.findOneOrFail({
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

  async update(id: string, updateRequestDetailDto: UpdateRequestDetailDto) {
    try {
      await this.requestDetailRepository.findOneOrFail({
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

    await this.requestDetailRepository.update(id, updateRequestDetailDto);

    return this.requestDetailRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.requestDetailRepository.findOneOrFail({
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

    await this.requestDetailRepository.delete(id);
  }
}
