import { FileService } from './file.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  editFileName,
  editFileNameProdukAgen,
  editFileNameTransaksiAgen,
  editFileNameTransaksiPembeli,
} from 'src/file/file-handler';
import * as fs from 'fs';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get(':img')
  seeUploadedFile(@Param('img') image, @Res() res) {
    try {
      const folder = `uploads`;
      const file = __dirname + `/../../${folder}/${image}`;
      if (fs.existsSync(file)) {
        return res.sendFile(image, {
          root: `./${folder}`,
        });
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'File not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (e) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'File not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: await this.fileService.renameUploadFile(file.filename),
    };
  }

  @Post('Produk_Agen')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileNameProdukAgen,
      }),
    }),
  )
  async uploadProfile(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: await this.fileService.renameUploadFile(file.filename),
    };
  }

  @Post('Transaksi_Agen')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileNameTransaksiAgen,
      }),
    }),
  )
  async uploadEvent(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: await this.fileService.renameUploadFile(file.filename),
    };
  }

  @Post('Transaksi_Pembeli')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileNameTransaksiPembeli,
      }),
    }),
  )
  async uploadPhotoProfile(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: await this.fileService.renameUploadFile(file.filename),
    };
  }
}
