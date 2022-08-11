/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdukAgenService } from 'src/produk/produk_agen/produk_agen.service';
import { Repository, EntityNotFoundError } from 'typeorm';
import { cart_detail } from '../entities/cart_detail.entity';
import { CreateCartDetailDto } from './dto/create-cart_detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart_detail.dto';

@Injectable()
export class CartDetailService {
  constructor(
    @InjectRepository(cart_detail)
    private cartDetailRepository: Repository<cart_detail>,
    private produkAgenService: ProdukAgenService,
  ) {}

  async create(createCartDetailDto: CreateCartDetailDto) {
    console.log(createCartDetailDto)
    const newCartDetail = new cart_detail();
    newCartDetail.jumlah_produk = createCartDetailDto.jumlah_produk
    newCartDetail.total_harga = createCartDetailDto.total_harga
    newCartDetail.produkAgen = await this.produkAgenService.findByProdukAgen(createCartDetailDto.nama_produk)

    const result = await this.cartDetailRepository.insert(newCartDetail)
     
      
    return this.cartDetailRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },relations: ['produkAgen']
    });
  }

  findAll() {
    return this.cartDetailRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.cartDetailRepository.findOneOrFail({
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

  async update(id: string, updateCartDetailDto: UpdateCartDetailDto) {
    try {
      await this.cartDetailRepository.findOneOrFail({
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

    await this.cartDetailRepository.update(id, updateCartDetailDto);

    return this.cartDetailRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.cartDetailRepository.findOneOrFail({
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

    await this.cartDetailRepository.delete(id);
  }
}
