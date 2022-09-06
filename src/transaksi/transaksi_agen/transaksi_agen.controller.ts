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

@ApiTags('Transaksi Agen')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('transaksi_agen')
export class TransaksiAgenController {
  constructor(private readonly transaksiAgenService: TransaksiAgenService) {}

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

  @Get('export/data')
  async export(){
    return await this.transaksiAgenService.export()
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
