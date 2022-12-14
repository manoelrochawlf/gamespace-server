import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { Email, Password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { Email } });

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    const isHashValid = await bcrypt.compare(Password, user.Password);

    if (!isHashValid) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    delete user.Password;

    return {
      token: this.jwtService.sign({ Email }),
      user,
    };
  }
}
