/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/user/users.service';
import { EntityNotFoundError, Repository } from 'typeorm';
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
    // private requestService: RequestService,
  ) {}

  async create(createTransaksiAgenDto: CreateTransaksiAgenDto) {
    console.log(createTransaksiAgenDto)
    const newTransaksi = new transaksi_agen();
      newTransaksi.total_bayar = createTransaksiAgenDto.total_bayar
      newTransaksi.tanggal = createTransaksiAgenDto.tanggal
      newTransaksi.bank = createTransaksiAgenDto.bank
      newTransaksi.bukti_bayar = createTransaksiAgenDto.bukti_bayar
      newTransaksi.agen = await this.usersService.findByUser(createTransaksiAgenDto.nama_agen)
      // newTransaksi.request = await this.requestService.findByRequest(createTransaksiAgenDto.nama_agen)

      const result = await this.transaksiAgenRepository.insert(newTransaksi)
     
      
    return this.transaksiAgenRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },relations: ['agen']
    });
  }

  findAll() {
    return this.transaksiAgenRepository.findAndCount({
    where: {},relations: ['agen']
    });
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
}
