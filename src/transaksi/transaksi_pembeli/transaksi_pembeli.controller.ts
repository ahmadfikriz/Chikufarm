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
} from '@nestjs/common';
import { TransaksiPembeliService } from './transaksi_pembeli.service';
import { CreateTransaksiPembeliDto } from './dto/create-transaksi_pembeli.dto';
import { UpdateTransaksiPembeliDto } from './dto/update-transaksi_pembeli.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('transaksi_pembeli')
export class TransaksiPembeliController {
  constructor(
    private readonly transaksiPembeliService: TransaksiPembeliService,
  ) {}

  @Post()
  async create(@Body() createTransaksiPembeliDto: CreateTransaksiPembeliDto) {
    return {
      data: await this.transaksiPembeliService.create(
        createTransaksiPembeliDto,
      ),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.transaksiPembeliService.findAll();

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
      data: await this.transaksiPembeliService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTransaksiPembeliDto: UpdateTransaksiPembeliDto,
  ) {
    return {
      data: await this.transaksiPembeliService.update(
        id,
        updateTransaksiPembeliDto,
      ),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.transaksiPembeliService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
