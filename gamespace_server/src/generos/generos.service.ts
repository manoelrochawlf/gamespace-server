import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenerosDto } from './dto/create-generos.dto';
import { UpdateGenerosDto } from './dto/update-generos.dto';
import { Generos } from './entities/generos.entity';

@Injectable()
export class generosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Generos[]> {
    return this.prisma.generos.findMany();
  }

  findOne(id: string): Promise<Generos> {
    return this.prisma.generos.findUnique({ where: { id } });
  }

  async create(dto: CreateGenerosDto) {
    const data: Prisma.GenerosCreateInput = {
      Name: dto.Name,
    };

    try {
      return await this.prisma.generos.create({
        data,
        select: {
          id: true,
          Name: true,
        },
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  update(id: string, dto: UpdateGenerosDto): Promise<Generos> {
    const data: Partial<Generos> = { ...dto };

    return this.prisma.generos.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    await this.prisma.generos.delete({ where: { id } });
  }

  handleError(error: Error) {
    console.log(error.message);

    return undefined;
  }
}
