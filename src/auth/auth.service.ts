import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async  cekUser(email, password) {
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

  generateToken(user:any) {
    console.log(user,"isi user")
    const dataToken = { id: user.id, role_id: user.role.id, rolename: user.role.nama};
    const token = this.jwtService.sign(dataToken);

    return { token: token };
  }
}
