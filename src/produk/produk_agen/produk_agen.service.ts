/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { produkAgen } from '../entities/produk_agen.entity';
import { CreateProdukAgenDto } from './dto/create-produk_agen.dto';
import { UpdateProdukAgenDto } from './dto/update-produk_agen.dto';
import { UsersService } from 'src/user/users.service';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ReviewDto } from './dto/review-produk_agen.dto';
import { Review } from '../entities/review.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProdukAgenService {
  constructor(
    @InjectRepository(produkAgen)
    private produkAgenRepository: Repository<produkAgen>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UsersService,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(createProdukAgenDto: CreateProdukAgenDto) {
    console.log(createProdukAgenDto)
    const newProdukAgen = new produkAgen();
    newProdukAgen.nama_produk = createProdukAgenDto.nama_produk
    newProdukAgen.deskripsi = createProdukAgenDto.deskripsi
    newProdukAgen.harga = createProdukAgenDto.harga
    newProdukAgen.stok = createProdukAgenDto.stok
    newProdukAgen.foto = createProdukAgenDto.foto
    newProdukAgen.agen = await this.usersService.findByUser(createProdukAgenDto.email)

    const result = await this.produkAgenRepository.insert(newProdukAgen)
     
      
    return this.produkAgenRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },relations: ['agen']
    });
  }

  async addReview(reviewDto: ReviewDto) {

    const pembeli: any = await this.usersRepository.findOneOrFail({where: {nama: reviewDto.pembeli}})
    const agen: any = await this.usersRepository.findOneOrFail({where: {nama: reviewDto.agen}})
    const produk: any = await this.produkAgenRepository.findOneOrFail({where: {nama_produk: reviewDto.nama_produk}})

    const review = new Review()
    review.komentar = reviewDto.komentar
    review.rating = reviewDto.rating
    review.pembeli = pembeli
    review.agen = agen
    review.produkAgen = produk
    
    await this.reviewRepository.insert(review)
    return this.reviewRepository.findOneOrFail({
        where: {
            id: review.id
        },relations: ['pembeli', 'agen', 'produkAgen']
    })
}

  async findAll(options: IPaginationOptions): Promise<Pagination<produkAgen>> {
    const queryBuilder = this.produkAgenRepository.createQueryBuilder('produkAgen')
    .innerJoinAndSelect('produkAgen.agen', 'user')
    .orderBy('produkAgen.nama_produk', 'ASC');
  
    return paginate<produkAgen>(queryBuilder, options);
  }

  async findProduk(
    options: IPaginationOptions,
    search: string,
    ): Promise<Pagination<produkAgen>> {
      const query = this.produkAgenRepository.createQueryBuilder('produkAgen')
      .innerJoinAndSelect('produkAgen.agen', 'user')
      .orderBy('produkAgen.nama_produk', 'ASC');
  
      if(search)(
        query
          .where('produkAgen.nama_produk LIKE :search', {search: `%${search}%`})
          .orWhere('user.nama LIKE :search', {search: `%${search}%`})
      )
      else(
        query.getMany()
      )
      await query.getMany()
      return paginate<produkAgen>(query, options)
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

  getReview(){
    return this.reviewRepository.findAndCount({
        relations: ['pembeli', 'agen', 'produkAgen']
    })
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

  async findByProdukAgen(nama_produk: string) {
    try {
      return await this.produkAgenRepository.findOneOrFail({
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

  async findByAgenId(id: string) {
    try {
      return await this.produkAgenRepository.findAndCount({
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