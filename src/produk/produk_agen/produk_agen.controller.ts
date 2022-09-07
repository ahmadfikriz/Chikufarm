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
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { of } from 'rxjs';
import { JwtGuard } from 'src/auth/jwt.guard';
import { CreateProdukAgenDto } from './dto/create-produk_agen.dto';
import { UpdateProdukAgenDto } from './dto/update-produk_agen.dto';
import { ProdukAgenService } from './produk_agen.service';

@ApiTags('Produk Agen')
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
        destination: './uploads/Produk Agen',
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

  @Get(':foto')
  async getBuktiBayar(@Param('foto') foto: string, @Res() res) {
    return of(
      res.sendFile(
        join(process.cwd(), `uploads/Produk Agen/${foto}`),
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

  @Get('produk/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.produkAgenService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get('agen/:id')
  async findByAgenId(@Param('id', ParseUUIDPipe) id: string) {
    const [data, count] = await this.produkAgenService.findByAgenId(id);

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
