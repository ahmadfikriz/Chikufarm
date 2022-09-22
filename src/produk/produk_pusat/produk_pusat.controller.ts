/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { ProdukPusatService } from './produk_pusat.service';
import { CreateProdukPusatDto } from './dto/create-produk_pusat.dto';
import { UpdateProdukPusatDto } from './dto/update-produk_pusat.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/user/entities/user.entity';
import { produkPusat } from '../entities/produk_pusat.entity';

@ApiTags('Produk Pusat')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('produk_pusat')
export class ProdukPusatController {
  constructor(private readonly produkPusatService: ProdukPusatService) {}

  @Post()
  async create(@Body() createProdukPusatDto: CreateProdukPusatDto) {
    return {
      data: await this.produkPusatService.create(createProdukPusatDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.produkPusatService.findAll();

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get('search')
    async findProduk(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
      @Query('search') search: string,
    ): Promise<Pagination<produkPusat>>{
      limit = limit > 100 ? 100 : limit;
      return this.produkPusatService.findProduk(
          {page, 
          limit, 
          route: 'http://localhost:3222/produk_pusat/search'},
          search,
        );
    }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.produkPusatService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProdukPusatDto: UpdateProdukPusatDto,
  ) {
    return {
      data: await this.produkPusatService.update(id, updateProdukPusatDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.produkPusatService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
