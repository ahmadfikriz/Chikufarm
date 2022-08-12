/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { produkAgen } from '../entities/produk_agen.entity';
import { CreateProdukAgenDto } from './dto/create-produk_agen.dto';
import { UpdateProdukAgenDto } from './dto/update-produk_agen.dto';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class ProdukAgenService {
  constructor(
    @InjectRepository(produkAgen)
    private produkAgenRepository: Repository<produkAgen>,
    private usersService: UsersService,
  ) {}

  async create(createProdukAgenDto: CreateProdukAgenDto) {
    console.log(createProdukAgenDto)
    const newProdukAgen = new produkAgen();
    newProdukAgen.nama_produk = createProdukAgenDto.nama_produk
    newProdukAgen.deskripsi = createProdukAgenDto.deskripsi
    newProdukAgen.harga = createProdukAgenDto.harga
    newProdukAgen.stok = createProdukAgenDto.stok
    newProdukAgen.foto = createProdukAgenDto.foto
    newProdukAgen.agen = await this.usersService.findByUser(createProdukAgenDto.nama_agen)

    const result = await this.produkAgenRepository.insert(newProdukAgen)
     
      
    return this.produkAgenRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },relations: ['agen']
    });
  }

  findAll() {
    return this.produkAgenRepository.findAndCount({
    where: {},relations: ['agen']
    });
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
}