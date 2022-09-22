/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  Put,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtGuard } from 'src/auth/jwt.guard';
import { User } from 'src/user/entities/user.entity';
import { bank } from '../entities/bank.entity';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@ApiTags('Bank')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  async create(@Body() createBankDto: CreateBankDto) {
    return {
      data: await this.bankService.create(createBankDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  // @Get()
  // async findAll() {
  //   const [data, count] = await this.bankService.findAll();

  //   return {
  //     data,
  //     count,
  //     statusCode: HttpStatus.OK,
  //     message: 'success',
  //   };
  // }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    ): Promise<Pagination<bank>> {
    limit = limit > 100 ? 100 : limit;

    return this.bankService.findAll({
      page,
      limit,
      route: 'http://localhost:3222/bank',
    });
  }

  @Get('search')
  async findBank(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ): Promise<Pagination<bank>>{
    limit = limit > 100 ? 100 : limit;
    return this.bankService.findBank(
        {page, 
        limit, 
        route: 'http://localhost:3222/bank/search'},
        search,
      );
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.bankService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBankDto: UpdateBankDto,
  ) {
    return {
      data: await this.bankService.update(id, updateBankDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.bankService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
