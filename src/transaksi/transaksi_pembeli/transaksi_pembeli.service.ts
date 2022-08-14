/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { transaksi_pembeli } from 'src/transaksi/entities/transaksi_pembeli.entity';
import { UsersService } from 'src/user/users.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { CreateTransaksiPembeliDto } from './dto/create-transaksi_pembeli.dto';
import { UpdateTransaksiPembeliDto } from './dto/update-transaksi_pembeli.dto';

@Injectable()
export class TransaksiPembeliService {
  constructor(
    @InjectRepository(transaksi_pembeli)
    private transaksiPembeliRepository: Repository<transaksi_pembeli>,
    private usersService: UsersService,
    private cartService: CartService,
  ) {}

  async create(createTransaksiPembeliDto: CreateTransaksiPembeliDto) {
    console.log(createTransaksiPembeliDto)
    const newTransaksi = new transaksi_pembeli();
      newTransaksi.total_bayar = createTransaksiPembeliDto.total_bayar
      newTransaksi.tanggal = createTransaksiPembeliDto.tanggal
      newTransaksi.bank = createTransaksiPembeliDto.bank
      newTransaksi.bukti_bayar = createTransaksiPembeliDto.bukti_bayar
      newTransaksi.pembeli = await this.usersService.findByUser(createTransaksiPembeliDto.nama_pembeli)
      newTransaksi.cart = await this.cartService.findByCart(createTransaksiPembeliDto.id_cart)

      const result = await this.transaksiPembeliRepository.insert(newTransaksi)
     
      
    return this.transaksiPembeliRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },relations: ['pembeli', 'cart']
    });
  }

  findAll() {
    return this.transaksiPembeliRepository.findAndCount({
    where: {},relations: ['pembeli', 'cart']
  });
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
