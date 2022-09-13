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
import { TransaksiPembeliService } from './transaksi_pembeli.service';
import { CreateTransaksiPembeliDto } from './dto/create-transaksi_pembeli.dto';
import { UpdateTransaksiPembeliDto } from './dto/update-transaksi_pembeli.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { of } from 'rxjs';
import { transaksi_pembeli } from '../entities/transaksi_pembeli.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('Transaksi Pembeli')
@Controller('transaksi_pembeli')
export class TransaksiPembeliController {
  constructor(
    private readonly transaksiPembeliService: TransaksiPembeliService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTransaksiPembeliDto })
  @UseInterceptors(
    FileInterceptor('bukti_bayar', {
      storage: diskStorage({
        destination: './uploads/Transaksi Pembeli',
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

  @Get('foto/:bukti_bayar')
  async getBuktiBayar(@Param('bukti_bayar') bukti_bayar: string, @Res() res) {
    return of(
      res.sendFile(
        join(process.cwd(), `uploads/Transaksi Pembeli/${bukti_bayar}`),
      ),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    ): Promise<Pagination<transaksi_pembeli>> {
    limit = limit > 100 ? 100 : limit;

    return this.transaksiPembeliService.findAll({
      page,
      limit,
      route: 'http://localhost:3222/transaksi_pembeli',
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('export/data')
  async export(){
    return await this.transaksiPembeliService.export()
  }

  // @Get()
  // async findAll() {
  //   const [data, count] = await this.transaksiPembeliService.findAll();

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
      data: await this.transaksiPembeliService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('pembeli/:id')
  async findByIdPembeli(@Param('id', ParseUUIDPipe) id: string) {
    const [data, count] = await this.transaksiPembeliService.findByIdPembeli(id);

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

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.transaksiPembeliService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
