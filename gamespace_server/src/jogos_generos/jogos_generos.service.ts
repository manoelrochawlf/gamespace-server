import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateJogosGeneroDto } from './dto/update-jogos_genero.dto';
import { CreateJogosGeneroDto } from './dto/create-jogos_genero.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class JogosGenerosService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateJogosGeneroDto) {
    const data: Prisma.JogosGenerosCreateInput = {
      Jogos: { connect: { id: dto.jogosId } },
      Generos: { connect: { id: dto.generosId } },
    };

    return this.prisma.jogosGeneros
      .create({
        data,
        select: {
          id: true,
          Jogos: { select: { Title: true } },
          Generos: { select: { Name: true } },
        },
      })
      .catch(this.handleError);
  }

  findAll() {
    return this.prisma.jogosGeneros.findMany({
      select: {
        id: true,
        Jogos: { select: { Title: true } },
        Generos: { select: { Name: true } },
      },
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.jogosGeneros.findUnique({
      where: { id },
      select: {
        id: true,
        generosId: true,
        jogosId: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async update(id: string, dto: UpdateJogosGeneroDto) {
    await this.findById(id);
    const data: Prisma.JogosGenerosUncheckedUpdateInput = {
      ...dto,
      generosId: dto.generosId,
      jogosId: dto.jogosId,
    };

    return this.prisma.jogosGeneros.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.jogosGeneros.delete({ where: { id } });
  }

  async findById(id: string) {
    const record = await this.prisma.jogosGeneros.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }
  handleError(error: Error) {
    console.log(error.message);

    return undefined;
  }
}
