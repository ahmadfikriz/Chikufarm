/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { generateExcel } from 'src/helper/export_excel';
import { ProdukPusatService } from 'src/produk/produk_pusat/produk_pusat.service';
import { UsersService } from 'src/user/users.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { BankService } from '../bank/bank.service';
import { transaksi_agen } from '../entities/transaksi_agen.entity';
import { RequestService } from '../request/request.service';
import { CreateTransaksiAgenDto } from './dto/create-transaksi_agen.dto';
import { UpdateTransaksiAgenDto } from './dto/update-transaksi_agen.dto';

@Injectable()
export class TransaksiAgenService {
  constructor(
    @InjectRepository(transaksi_agen)
    private transaksiAgenRepository: Repository<transaksi_agen>,
    private usersService: UsersService,
    private requestService: RequestService,
    private produkPusatService: ProdukPusatService,
    private bankService: BankService,
  ) {}

  async create(createTransaksiAgenDto: CreateTransaksiAgenDto) {
    console.log(createTransaksiAgenDto)
    const newTransaksi = new transaksi_agen();
      newTransaksi.jumlah_produk = createTransaksiAgenDto.jumlah_produk
      newTransaksi.total_bayar = createTransaksiAgenDto.total_bayar
      newTransaksi.bukti_bayar = createTransaksiAgenDto.bukti_bayar
      newTransaksi.agen = await this.usersService.findByUser(createTransaksiAgenDto.email)
      newTransaksi.request = await this.requestService.findByRequest(createTransaksiAgenDto.id_request)
      newTransaksi.produkPusat = await this.produkPusatService.findByProdukPusat(createTransaksiAgenDto.nama_produk)
      newTransaksi.bank = await this.bankService.findByBank(createTransaksiAgenDto.no_rekening)

      const result = await this.transaksiAgenRepository.insert(newTransaksi)
     
      
    return this.transaksiAgenRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },relations: ['agen', 'request', 'produkPusat', 'bank']
    });
  }

  // findAll() {
  //   return this.transaksiAgenRepository.findAndCount({
  //   where: {},relations: ['agen', 'request', 'produkPusat', 'bank']
  //   });
  // }

  async findAll(options: IPaginationOptions): Promise<Pagination<transaksi_agen>> {
    const queryBuilder = this.transaksiAgenRepository.createQueryBuilder('transaksi_agen')
    .innerJoinAndSelect('transaksi_agen.agen', 'nama')
    .innerJoinAndSelect('transaksi_agen.request', 'id')
    .innerJoinAndSelect('transaksi_agen.produkPusat', 'nama_produk')
    .innerJoinAndSelect('transaksi_agen.bank', 'nama_akun_bank')
    .orderBy('transaksi_agen.id', 'ASC');
  
    return paginate<transaksi_agen>(queryBuilder, options);
  }

  async findOne(id: string) {
    try {
      return await this.transaksiAgenRepository.findOneOrFail({
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

  async update(id: string, updateTransaksiAgenDto: UpdateTransaksiAgenDto) {
    try {
      await this.transaksiAgenRepository.findOneOrFail({
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

    await this.transaksiAgenRepository.update(id, updateTransaksiAgenDto);

    return this.transaksiAgenRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.transaksiAgenRepository.findOneOrFail({
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

    await this.transaksiAgenRepository.delete(id);
  }

  async findByIdAgen(id: string) {
    try {
      return await this.transaksiAgenRepository.findAndCount({
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

  async export(){
    const transaction = await this.transaksiAgenRepository.find({relations: ['agen', 'request', 'produkPusat', 'bank']})

    return await generateExcel(transaction, 'dataTransaksiAgen')
  }
}