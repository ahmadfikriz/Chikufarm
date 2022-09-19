/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';
import { EditPasswordDto } from './dto/edit-password.dto';

@ApiTags('User')
// @ApiBearerAuth()
// @UseGuards(JwtGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      data: await this.usersService.create(createUserDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;

    return this.usersService.findAll({
      page,
      limit,
      route: 'http://localhost:3222/user',
    });
  }

  @Get('role')
  async findRole(@Query('type') type:number) {
    console.log(type, "isi type")
    const [data, count] =  await this.usersService.findRole(type);

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get('export/data')
  async excelGenerator(){
    return await this.usersService.export()
  }

  @Get('report-download')
  async excelDownloader(@Res() res) {
    return await res.download(
      `./uploads/export/${await this.excelGenerator()}`,
      `DataUser.xlsx`,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.usersService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return {
      data: await this.usersService.update(id, updateUserDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put('update/Password/:id')
  async updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() editPasswordDto: EditPasswordDto,
  ) {
    return {
      data: await this.usersService.updatePassword(id, editPasswordDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.usersService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
