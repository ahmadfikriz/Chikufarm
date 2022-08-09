import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async cekUser(email, password) {
    const user = await this.userService.findEmail(email);

    if (user) {
      const valid = this.userService.compare(password, user.password);

      if (valid) {
        return user;
      }

      throw new BadRequestException({ message: 'Password salah' });
    } else {
      throw new BadRequestException({ message: 'Email tidak ditemukan' });
    }
  }

  generateToken(user: any) {
    const dataToken = { id: user.id };
    const token = this.jwtService.sign(dataToken);

    return { token: token };
  }
}
