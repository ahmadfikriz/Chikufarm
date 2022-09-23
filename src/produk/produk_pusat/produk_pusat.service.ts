/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/user/entities/user.entity';
import { Repository, EntityNotFoundError } from 'typeorm';
import { produkPusat } from '../entities/produk_pusat.entity';
import { Review } from '../entities/review.entity';
import { ReviewDto } from '../produk_agen/dto/review-produk_agen.dto';
import { CreateProdukPusatDto } from './dto/create-produk_pusat.dto';
import { UpdateProdukPusatDto } from './dto/update-produk_pusat.dto';

@Injectable()
export class ProdukPusatService {
  constructor(
    @InjectRepository(produkPusat)
    private produkPusatRepository: Repository<produkPusat>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
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

  async addReview(reviewDto: ReviewDto) {

    const agen: any = await this.usersRepository.findOneOrFail({where: {email: reviewDto.email_agen}})
    const produk: any = await this.produkPusatRepository.findOneOrFail({where: {nama_produk: reviewDto.nama_produk}})

    const review = new Review()
    review.komentar = reviewDto.komentar
    review.rating = reviewDto.rating
    review.agen = agen
    review.produkPusat = produk
    
    await this.reviewRepository.insert(review)
    return this.reviewRepository.findOneOrFail({
        where: {
            id: review.id
        },relations: ['agen', 'produkPusat']
    })
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

  async removeProduk(id: string) {
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

  async removeReview(id: string) {
    try {
      await this.reviewRepository.findOneOrFail({
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

    await this.reviewRepository.delete(id);
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

  getReview(){
    return this.reviewRepository.findAndCount({
        relations: ['agen', 'produkPusat']
    })
  }

  async rating(id: string) {
    const rating = await this.reviewRepository.find({
        where: {
            produkPusat: {id: id}
        },
        relations: {
          produkPusat: true
        }
    })
    const arr = []
    rating.map(result => arr.push(result.rating))
    const average = arr.reduce((a, b) => a + b, 0)
    return `average: ${average}`
  }
}
