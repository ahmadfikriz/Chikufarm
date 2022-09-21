/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { generateExcel } from 'src/helper/export_excel';
import { ProdukAgenService } from 'src/produk/produk_agen/produk_agen.service';
import { transaksi_pembeli } from 'src/transaksi/entities/transaksi_pembeli.entity';
import { UsersService } from 'src/user/users.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { BankService } from '../bank/bank.service';
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
    private produkAgenService: ProdukAgenService,
    private bankService: BankService,
  ) {}

  async create(createTransaksiPembeliDto: CreateTransaksiPembeliDto) {
    console.log(createTransaksiPembeliDto)
    const newTransaksi = new transaksi_pembeli();
      newTransaksi.jumlah_produk = createTransaksiPembeliDto.jumlah_produk
      newTransaksi.total_bayar = createTransaksiPembeliDto.total_bayar
      newTransaksi.bukti_bayar = createTransaksiPembeliDto.bukti_bayar
      newTransaksi.pembeli = await this.usersService.findByUser(createTransaksiPembeliDto.email)
      newTransaksi.cart = await this.cartService.findByCart(createTransaksiPembeliDto.id_cart)
      newTransaksi.produkAgen = await this.produkAgenService.findByProdukAgen(createTransaksiPembeliDto.nama_produk)
      newTransaksi.bank = await this.bankService.findByBank(createTransaksiPembeliDto.no_rekening)

      const result = await this.transaksiPembeliRepository.insert(newTransaksi)
     
      
    return this.transaksiPembeliRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },relations: ['pembeli', 'cart', 'produkAgen', 'bank']
    });
  }

//   findAll() {
//     return this.transaksiPembeliRepository.findAndCount({
//     where: {},relations: ['pembeli', 'cart', 'produkAgen', 'bank']
//   });
// }

async findAll(options: IPaginationOptions): Promise<Pagination<transaksi_pembeli>> {
  const queryBuilder = this.transaksiPembeliRepository.createQueryBuilder('transaksi_pembeli')
  .innerJoinAndSelect('transaksi_pembeli.pembeli', 'nama')
  .leftJoinAndSelect('transaksi_pembeli.cart', 'id')
  .innerJoinAndSelect('transaksi_pembeli.produkAgen', 'nama_produk')
  .innerJoinAndSelect('transaksi_pembeli.bank', 'nama_akun')
  .orderBy('transaksi_pembeli.id', 'ASC');

  return paginate<transaksi_pembeli>(queryBuilder, options);
}

async findTransaksi(
  options: IPaginationOptions,
  search: string,
  ): Promise<Pagination<transaksi_pembeli>> {
    const query = this.transaksiPembeliRepository.createQueryBuilder('transaksi_pembeli')
    .innerJoinAndSelect('transaksi_pembeli.pembeli', 'user')
    // .leftJoinAndSelect('transaksi_pembeli.cart', 'id')
    .innerJoinAndSelect('transaksi_pembeli.produkAgen', 'produkAgen')
    .innerJoinAndSelect('transaksi_pembeli.bank', 'bank')
    // .orderBy('transaksi_pembeli.id', 'ASC');

    if(search)(
      query
        .where('user.nama LIKE :search', {search: `%${search}%`})
        .orWhere('produkAgen.nama_produk LIKE :search', {search: `%${search}%`})
        .orWhere('bank.nama_akun LIKE :search', {search: `%${search}%`})
        .orWhere('bank.nama_bank LIKE :search', {search: `%${search}%`})
    )

    else(
      query.getMany()
    )
    await query.getMany()
    return paginate<transaksi_pembeli>(query, options)
  }

  async findOne(id: string) {
    try {
      return await this.transaksiPembeliRepository.findOneOrFail({
        where: {
          id,
        },relations: ['pembeli', 'cart', 'produkAgen', 'bank']
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

  async findByIdPembeli(id: string) {
    try {
      return await this.transaksiPembeliRepository.findAndCount({
        relations: {
          pembeli: true,
          cart: true,
          produkAgen: true,
          bank: true,
        },
        where: {
          pembeli: {
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

  async export(){
    const transaction = await this.transaksiPembeliRepository.find({relations: ['pembeli', 'cart', 'produkAgen', 'bank']})

    return await generateExcel(transaction, 'dataTransaksiPembeli')
  }
}
