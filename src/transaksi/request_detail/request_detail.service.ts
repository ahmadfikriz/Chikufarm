import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { request_detail } from '../entities/request_detail.entity';
import { CreateRequestDetailDto } from './dto/create-request_detail.dto';
import { UpdateRequestDetailDto } from './dto/update-request_detail.dto';

@Injectable()
export class RequestDetailService {
  constructor(
    @InjectRepository(request_detail)
    private requestDetailRepository: Repository<request_detail>,
  ) {}

  async create(createRequestDetailDto: CreateRequestDetailDto) {
    const result = await this.requestDetailRepository.insert(
      createRequestDetailDto,
    );

    return this.requestDetailRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.requestDetailRepository.findAndCount();
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
