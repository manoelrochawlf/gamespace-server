import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { triggerAsyncId } from 'async_hooks';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    Name: true,
    Email: true,
    Password: false,
    Cpf: false,
    isAdmin: false,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        Name: true,
        Email: true,
        Password: true,
        Cpf: true,
        isAdmin: false,
        Profiles: true,
      },
    });
  }

  findOne(id: string) {
    return this.findById(id);
  }

  async findById(id: string) {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async create(dto: CreateUserDto) {
    if (dto.Password != dto.ConfirmPassword) {
      throw new BadRequestException('Senhas não conferem!');
    }
    delete dto.ConfirmPassword;

    const data: Prisma.UserCreateInput = {
      ...dto,
      Password: await bcrypt.hash(dto.Password, 10),
    };

    return this.prisma.user
      .create({
        data,
        select: {
          Name: true,
          Email: true,
          Password: true,
          Cpf: true,
        },
      })
      .catch(this.handleError);
  }

  async update(id: string, dto: UpdateUserDto) {
    if (dto.Password) {
      if (dto.Password != dto.ConfirmPassword) {
        throw new BadRequestException('Senhas não conferem!');
      }
    }
    delete dto.ConfirmPassword;
    await this.findById(id);
    const data: Prisma.UserUpdateInput = {
      ...dto,
      Password: await bcrypt.hash(dto.Password, 10),
    };

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação!',
    );
  }
}
