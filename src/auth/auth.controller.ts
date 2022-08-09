import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { use } from 'passport';
import { User } from 'src/user/entities/user.entity';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  cekUser(@Request() req) {
    return req.user;
  }

  @Post()
  async login(@Body() authDto: AuthDto) {
    const user = await this.authService.cekUser(authDto.email, authDto.password);
    try {
      console.log('email :', authDto.email);
      console.log('password :', authDto.password);
    } catch (e) {
      throw e;
    }
    return this.authService.generateToken(user);
  }
}

