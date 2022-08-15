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
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { of } from 'rxjs';
import { JwtGuard } from 'src/auth/jwt.guard';
import { CreateProdukAgenDto } from './dto/create-produk_agen.dto';
import { UpdateProdukAgenDto } from './dto/update-produk_agen.dto';
import { ProdukAgenService } from './produk_agen.service';

@Controller('produk_agen')
export class ProdukAgenController {
  constructor(private readonly produkAgenService: ProdukAgenService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProdukAgenDto })
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './src/produk/produk_agen/foto',
        filename: (req: any, file, cb) => {
          const namaFile = [req.user.id, Date.now()].join('-');
          cb(null, namaFile + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() createProdukAgenDto: CreateProdukAgenDto,
    @UploadedFile() foto: Express.Multer.File,
  ) {
    createProdukAgenDto.foto = foto.filename;
    return {
      data: await this.produkAgenService.create(createProdukAgenDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get('foto')
  async getBuktiBayar(@Param('foto') foto: string, @Res() res) {
    return of(
      res.sendFile(
        join(process.cwd(), `./src/produk/produk_agen/foto/${foto}`),
      ),
    );
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

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.produkAgenService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
