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
  UploadedFile,
  UseInterceptors,
  Res,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TransaksiAgenService } from './transaksi_agen.service';
import { CreateTransaksiAgenDto } from './dto/create-transaksi_agen.dto';
import { UpdateTransaksiAgenDto } from './dto/update-transaksi_agen.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { of } from 'rxjs';
import { transaksi_agen } from '../entities/transaksi_agen.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import moment from 'moment';

@ApiTags('Transaksi Agen')
@Controller('transaksi_agen')
export class TransaksiAgenController {
  constructor(private readonly transaksiAgenService: TransaksiAgenService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTransaksiAgenDto })
  @UseInterceptors(
    FileInterceptor('bukti_bayar', {
      storage: diskStorage({
        destination: './uploads/Transaksi Agen',
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

  @Get('foto/:bukti_bayar')
  async getBuktiBayar(@Param('bukti_bayar') bukti_bayar: string, @Res() res) {
    return of(
      res.sendFile(
        join(process.cwd(), `uploads/Transaksi Agen/${bukti_bayar}`),
      ),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    ): Promise<Pagination<transaksi_agen>> {
    limit = limit > 100 ? 100 : limit;

    return this.transaksiAgenService.findAll({
      page,
      limit,
      route: 'http://localhost:3222/transaksi_agen',
    });
  }

  // @ApiBearerAuth()
  // @UseGuards(JwtGuard)
  @Get('export/data')
  async excelGenerator(){
    return await this.transaksiAgenService.export()
  }

  @Get('report-download')
  async excelDownloader(@Res() res) {
    return await res.download(
      `./uploads/export/${await this.excelGenerator()}`,
      `DataTransaksiAgen.xlsx`,
    );
  }

  // @Get()
  // async findAll() {
  //   const [data, count] = await this.transaksiAgenService.findAll();

  //   return {
  //     data,
  //     count,
  //     statusCode: HttpStatus.OK,
  //     message: 'success',
  //   };
  // }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.transaksiAgenService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('agen/:id')
  async findByIdAgen(@Param('id', ParseUUIDPipe) id: string) {
    const [data, count] = await this.transaksiAgenService.findByIdAgen(id);

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.transaksiAgenService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
