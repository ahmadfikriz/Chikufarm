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
import { TransaksiPembeliService } from './transaksi_pembeli.service';
import { CreateTransaksiPembeliDto } from './dto/create-transaksi_pembeli.dto';
import { UpdateTransaksiPembeliDto } from './dto/update-transaksi_pembeli.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { create } from 'domain';
import { of } from 'rxjs';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('transaksi_pembeli')
export class TransaksiPembeliController {
  constructor(
    private readonly transaksiPembeliService: TransaksiPembeliService,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTransaksiPembeliDto })
  @UseInterceptors(
    FileInterceptor('bukti_bayar', {
      storage: diskStorage({
        destination: './src/transaksi/transaksi_pembeli/bukti',
        filename: (req: any, file, cb) => {
          const namaFile = [req.user.id, Date.now()].join('-');
          cb(null, namaFile + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() createTransaksiPembeliDto: CreateTransaksiPembeliDto,
    @UploadedFile() bukti_bayar: Express.Multer.File,
  ) {
    createTransaksiPembeliDto.bukti_bayar = bukti_bayar.filename;
    return {
      data: await this.transaksiPembeliService.create(
        createTransaksiPembeliDto,
      ),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get('bukti_bayar')
  async getBuktiBayar(@Param('bukti_bayar') bukti_bayar: string, @Res() res) {
    return of(
      res.sendFile(
        join(process.cwd(), `./src/transaksi/transaksi_pembeli/bukti/${bukti_bayar}`),
      ),
    );
  }

  @Get('export/data')
  async export(){
    return await this.transaksiPembeliService.export()
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
