/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { generateString, InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RoleService } from './role/role.service';
import { generateExcel } from 'src/helper/export_excel';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { EditPasswordDto } from './dto/edit-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private roleService: RoleService
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);

    const newUser = new User();

      newUser.nama = createUserDto.nama;
      newUser.email = createUserDto.email;
      newUser.password = createUserDto.password;
      newUser.no_hp = createUserDto.no_hp;
      newUser.alamat = createUserDto.alamat;
      newUser.role = await this.roleService.findByRoleName(createUserDto.roles);

      // createUserDto.password = this.hash(createUserDto.password)
      const result = await this.usersRepository.insert(newUser);


    return this.usersRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
relations: ['role'],
    });
  }

  async findRole(type) {
    let role;
    let q;

    if (type) {
      console.log('masuk sini?');
      role = await this.roleService.findOne(type);
      console.log('role', role);
      q =  this.usersRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'nama')
      .where('role_id =:type', {type:type})
      .getManyAndCount();
    } else {
      console.log('masuk sana');
      q =  this.usersRepository.findAndCount({
       relations: ['role'],
      });
    }

   return q;
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<User>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user')
    .innerJoinAndSelect('user.role', 'nama')
    .orderBy('user.nama', 'ASC');

    return paginate<User>(queryBuilder, options);
  }

  async findOne(id: string) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          id,
        },relations: ['role'],
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

  async findEmail(email) {
    return await this.usersRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.role', 'role')
    .where('email = :email', {email:email})
    .getOne();
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

  async updatePassword(id: string, editPasswordDto: EditPasswordDto) {
    await this.usersRepository.findOneOrFail({where: {
      id: id
    },
  });
  
  // await this.usersRepository.update()
  
  if(editPasswordDto.password === editPasswordDto.confirm_password) {
    const salt = await bcrypt.genSalt()
    const passwordBaru = await bcrypt.hash(editPasswordDto.password, salt);
    // const data = new Users()
    const data = await this.usersRepository.findOneOrFail({
      where: {
        id: id
      },
    });
    data.password = passwordBaru;
        
    await this.usersRepository.update({id}, data );
    return await this.usersRepository.findOneOrFail({where: {id,}});
  } else {
    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Password Harus Sama',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
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

  hash(plainPassword) {
    const hash = bcrypt.hashSync(plainPassword, 20);

    return hash;
  }

  compare(plainPassword, hash) {
    const valid = bcrypt.compare(plainPassword, hash);

    return valid;
  }

  async findByUser(email: string) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          email,
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

// async searchByNama(nama: string){
//   return await this.usersRepository.createQueryBuilder("user")
//   .innerJoinAndSelect('user.role', 'nama')
//   .where("user.nama LIKE :nama", {nama: `%` + `${nama}` + `%`})
//   .getMany()
// }

async findUser(
  options: IPaginationOptions,
  search: string,
  // role: string,
  ): Promise<Pagination<User>> {
    const query = this.usersRepository.createQueryBuilder('user').innerJoinAndSelect('user.role', 'nama')

    // const roleName = ['admin', 'agen', 'pembeli']

    // if (roleName.includes(role)){
    //   query
    //     .where('role.nama LIKE :role', {role: `%${role}%`})
    //     .andWhere('user.nama LIKE :search', {search: `%${search}%`})
    //     .andWhere('user.email LIKE :search', {search: `%${search}%`})
    // }

    if(search)(
      query
        .where('user.nama LIKE :search', {search: `%${search}%`})
        .orWhere('user.email LIKE :search', {search: `%${search}%`})
    )

    else(
      query.getMany()
    )
    await query.getMany()
    return paginate<User>(query, options)
  }

  async export() {
    const dataUser = await this.usersRepository.find({relations: ['role']});

    return generateExcel(dataUser, 'dataUser');
  }
}
