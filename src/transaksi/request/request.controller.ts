/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  ParseUUIDPipe,
  Put,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { request } from '../entities/request.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('Request')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  async create(@Body() createRequestDto: CreateRequestDto) {
    return {
      data: await this.requestService.create(createRequestDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  // @Get()
  // async findAll() {
  //   const [data, count] = await this.requestService.findAll();

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
    ): Promise<Pagination<request>> {
    limit = limit > 100 ? 100 : limit;

    return this.requestService.findAll({
      page,
      limit,
      route: 'http://localhost:3222/request',
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.requestService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRequestDto: UpdateRequestDto,
  ) {
    return {
      data: await this.requestService.update(id, updateRequestDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get('agen/:id')
  async findByIdAgen(@Param('id', ParseUUIDPipe) id: string) {
    const [data, count] = await this.requestService.findByIdAgen(id);

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.requestService.remove(id);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
