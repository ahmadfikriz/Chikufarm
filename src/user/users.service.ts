/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RoleService } from './role/role.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RoleService
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto)
    const newUser = new User();
      newUser.nama = createUserDto.nama
      newUser.email = createUserDto.email
      newUser.password = createUserDto.password
      newUser.no_hp = createUserDto.no_hp
      newUser.alamat = createUserDto.alamat
      newUser.role = await this.roleService.findByRoleName(createUserDto.roles)

      // createUserDto.password = this.hash(createUserDto.password) 
      const result = await this.usersRepository.insert(newUser)
     
      
    return this.usersRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },relations: ['role']
    });
  }

  findAll() {
    return this.usersRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.usersRepository.findOneOrFail({
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

  findEmail(email) {
    return this.usersRepository.findOneBy({email:email})
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.usersRepository.findOneOrFail({
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

    await this.usersRepository.update(id, updateUserDto);

    return this.usersRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.usersRepository.findOneOrFail({
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

    await this.usersRepository.delete(id);
  }

  hash(plainPassword){
    const hash = bcrypt.hashSync(plainPassword, 20)
    
    return hash
  }
  compare(plainPassword, hash){
    
    const valid = bcrypt.compare(plainPassword, hash)
    
    return valid
  }
}
