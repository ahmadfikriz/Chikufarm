/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdukAgenService } from 'src/produk/produk_agen/produk_agen.service';
import { UsersService } from 'src/user/users.service';
import { Repository, EntityNotFoundError } from 'typeorm';
import { cart } from '../entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(cart)
    private cartRepository: Repository<cart>,
    private usersService: UsersService,
    private produkAgenService: ProdukAgenService,
  ) {}

  async create(createCartDto: CreateCartDto) {
    console.log(createCartDto)
    const newCart = new cart();
    newCart.jumlah_produk = createCartDto.jumlah_produk
    newCart.total_harga = createCartDto.total_harga
    newCart.status = createCartDto.status
    newCart.pembeli = await this.usersService.findByUser(createCartDto.nama_pembeli)
    newCart.produkAgen = await this.produkAgenService.findByProdukAgen(createCartDto.nama_produk)

    const result = await this.cartRepository.insert(newCart)
     
      
    return this.cartRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },relations: ['produkAgen', 'pembeli']
    });
  }

  findAll() {
    return this.cartRepository.findAndCount({
    where: {},relations: ['produkAgen', 'pembeli']
  });
}

  async findOne(id: string) {
    try {
      return await this.cartRepository.findOneOrFail({
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

  async update(id: string, updateCartDto: UpdateCartDto) {
    try {
      await this.cartRepository.findOneOrFail({
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

    await this.cartRepository.update(id, updateCartDto);

    return this.cartRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.cartRepository.findOneOrFail({
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

    await this.cartRepository.delete(id);
  }

  async findByCart(id: string){
    try {
      return await this.cartRepository.findOneOrFail({
        where: {
          id
        }
      })
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
