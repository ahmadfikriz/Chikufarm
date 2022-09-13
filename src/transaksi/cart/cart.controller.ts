/* eslint-disable prettier/prettier */
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
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtGuard } from 'src/auth/jwt.guard';
import { bank } from '../entities/bank.entity';
import { cart } from '../entities/cart.entity';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    return {
      data: await this.cartService.create(createCartDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  // @Get()
  // async findAll() {
  //   const [data, count] = await this.cartService.findAll();

  //   return {
  //     data,
  //     count,
  //     statusCode: HttpStatus.OK,
  //     message: 'success',
  //   };
  // }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    ): Promise<Pagination<cart>> {
    limit = limit > 100 ? 100 : limit;

    return this.cartService.findAll({
      page,
      limit,
      route: 'http://localhost:3222/cart',
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.cartService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get('pembeli/:id')
  async findByIdPembeli(@Param('id', ParseUUIDPipe) id: string) {
    const [data, count] = await this.cartService.findByIdPembeli(id);

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
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return {
      data: await this.cartService.update(id, updateCartDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.cartService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
