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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TransaksiAgenService } from './transaksi_agen.service';
import { CreateTransaksiAgenDto } from './dto/create-transaksi_agen.dto';
import { UpdateTransaksiAgenDto } from './dto/update-transaksi_agen.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('transaksi_agen')
export class TransaksiAgenController {
  constructor(private readonly transaksiAgenService: TransaksiAgenService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTransaksiAgenDto })
  @UseInterceptors(
    FileInterceptor('bukti_bayar', {
      storage: diskStorage({
        destination: './src/transaksi/transaksi_agen/bukti',
        filename: (req: any, file, cb) => {
          const namaFile = [req.user.id, Date.now()].join('-');
          cb(null, namaFile + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() createTransaksiAgenDto: CreateTransaksiAgenDto,
    @UploadedFile() bukti_bayar: Express.Multer.File,
  ) {
    createTransaksiAgenDto.bukti_bayar = bukti_bayar.filename;
    return {
      data: await this.transaksiAgenService.create(createTransaksiAgenDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.transaksiAgenService.findAll();

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
      data: await this.transaksiAgenService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTransaksiAgenDto: UpdateTransaksiAgenDto,
  ) {
    return {
      data: await this.transaksiAgenService.update(id, updateTransaksiAgenDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.transaksiAgenService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
