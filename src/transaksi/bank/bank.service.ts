/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { UsersService } from 'src/user/users.service';
import { Repository, EntityNotFoundError } from 'typeorm';
import { bank } from '../entities/bank.entity';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(bank)
    private bankRepository: Repository<bank>,
    private usersService: UsersService,
  ) {}

  async create(createBankDto: CreateBankDto) {
    console.log(createBankDto)
    const newBank = new bank();
    newBank.nama_bank = createBankDto.nama_bank
    newBank.nama_akun = createBankDto.nama_akun
    newBank.no_rekening = createBankDto.no_rekening
    newBank.user = await this.usersService.findByUser(createBankDto.nama_user)

    const result = await this.bankRepository.insert(newBank)
     
      
    return this.bankRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },relations: ['user']
    });
  }

//   findAll() {
//     return this.bankRepository.findAndCount({
//     where: {},relations: ['user']
//   });
// }

async findAll(options: IPaginationOptions): Promise<Pagination<bank>> {
  const queryBuilder = this.bankRepository.createQueryBuilder('bank')
  .innerJoinAndSelect('bank.user', 'nama')
  .orderBy('bank.nama_akun', 'ASC');

  return paginate<bank>(queryBuilder, options);
}

  async findOne(id: string) {
    try {
      return await this.bankRepository.findOneOrFail({
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

  async update(id: string, updateBankDto: UpdateBankDto) {
    try {
      await this.bankRepository.findOneOrFail({
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

    await this.bankRepository.update(id, updateBankDto);

    return this.bankRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.bankRepository.findOneOrFail({
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

    await this.bankRepository.delete(id);
  }

  async findByBank(no_rekening: string){
    try {
      return await this.bankRepository.findOneOrFail({
        where: {
          no_rekening
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
