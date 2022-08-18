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
} from '@nestjs/common';
import { ProdukPusatService } from './produk_pusat.service';
import { CreateProdukPusatDto } from './dto/create-produk_pusat.dto';
import { UpdateProdukPusatDto } from './dto/update-produk_pusat.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';

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
