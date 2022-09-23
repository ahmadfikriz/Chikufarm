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
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Pagination } from 'nestjs-typeorm-paginate';
import { extname, join } from 'path';
import { of } from 'rxjs';
import { JwtGuard } from 'src/auth/jwt.guard';
import { produkAgen } from '../entities/produk_agen.entity';
import { CreateProdukAgenDto } from './dto/create-produk_agen.dto';
import { ReviewDto } from './dto/review-produk_agen.dto';
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

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('review')
    async addReview(
        @Body() reviewDto: ReviewDto,
        ) {
        try {
            return {
                data: await this.produkAgenService.addReview(reviewDto),
                statusCode: 200,
                message: 'berhasil'
            }
        }catch(error) {
            return {
                message: 'error',
                error
            } 
        } 
    }

    @Get('review')
    async getReview(){
        return this.produkAgenService.getReview()
    }
    
    @Get('rating/produk/:id')
    rating(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        return this.produkAgenService.rating(id)
    }

  @Get('produk/:foto')
  async getBuktiBayar(@Param('foto') foto: string, @Res() res) {
    return of(
      res.sendFile(
        join(process.cwd(), `uploads/Produk Agen/${foto}`),
      ),
    );
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    ): Promise<Pagination<produkAgen>> {
    limit = limit > 100 ? 100 : limit;

    return this.produkAgenService.findAll({
      page,
      limit,
      route: 'http://localhost:3222/produk_agen',
    });
  }

  @Get('search')
    async findProduk(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
      @Query('search') search: string,
    ): Promise<Pagination<produkAgen>>{
      limit = limit > 100 ? 100 : limit;
      return this.produkAgenService.findProduk(
          {page, 
          limit, 
          route: 'http://localhost:3222/produk_agen/search'},
          search,
        );
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
  @Delete('produk/:id')
  async removeProduk(@Param('id', ParseUUIDPipe) id: string) {
    await this.produkAgenService.removeProduk(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete('review/:id')
  async removeReview(@Param('id', ParseUUIDPipe) id: string) {
    await this.produkAgenService.removeReview(id)
    return {
      statusCode: HttpStatus.OK,
      message: 'success'
    }
  }
}
