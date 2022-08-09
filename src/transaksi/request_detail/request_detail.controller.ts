import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RequestDetailService } from './request_detail.service';
import { CreateRequestDetailDto } from './dto/create-request_detail.dto';
import { UpdateRequestDetailDto } from './dto/update-request_detail.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('request_detail')
export class RequestDetailController {
  constructor(private readonly requestDetailService: RequestDetailService) {}

  @Post()
  async create(@Body() createRequestDetailDto: CreateRequestDetailDto) {
    return {
      data: await this.requestDetailService.create(createRequestDetailDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.requestDetailService.findAll();

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
      data: await this.requestDetailService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRequestDetailDto: UpdateRequestDetailDto,
  ) {
    return {
      data: await this.requestDetailService.update(id, updateRequestDetailDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.requestDetailService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
