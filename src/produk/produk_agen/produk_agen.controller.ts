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
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { CreateProdukAgenDto } from './dto/create-produk_agen.dto';
import { UpdateProdukAgenDto } from './dto/update-produk_agen.dto';
import { ProdukAgenService } from './produk_agen.service';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('produk_agen')
export class ProdukAgenController {
  constructor(private readonly produkAgenService: ProdukAgenService) {}

  @Post()
  async create(@Body() createProdukAgenDto: CreateProdukAgenDto) {
    return {
      data: await this.produkAgenService.create(createProdukAgenDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.produkAgenService.findAll();

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.produkAgenService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProdukAgenDto: UpdateProdukAgenDto,
  ) {
    return {
      data: await this.produkAgenService.update(id, updateProdukAgenDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.produkAgenService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
