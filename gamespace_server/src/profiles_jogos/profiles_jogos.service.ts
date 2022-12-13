import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfilesJogoDto } from './dto/create-profiles_jogo.dto';
import { UpdateProfilesJogoDto } from './dto/update-profiles_jogo.dto';

@Injectable()
export class ProfilesJogosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProfilesJogoDto) {
    const data: Prisma.ProfilesJogosCreateInput = {
      Profiles: { connect: { id: dto.Profiles } },
      Jogos: { connect: { id: dto.Jogos } },
    };

    return this.prisma.profilesJogos
      .create({
        data,
        select: {
          id: true,
          Profiles: true,
          Jogos: true,
        },
      })
      .catch(this.handleError);
  }

  async findAll() {
    const record = await this.prisma.profilesJogos.findMany({
      select: {
        id: true,
        Profiles: true,
        Jogos: true,
      },
    });

    return record;
  }

  async findOne(id: string) {
    const record = await this.prisma.profilesJogos.findUnique({
      where: { id },
      select: {
        id: true,
        Profiles: true,
        Jogos: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async update(id: string, dto: UpdateProfilesJogoDto) {
    await this.findById(id);
    const data: Prisma.ProfilesJogosUpdateInput = {
      ...dto,
      Profiles: { connect: { id: dto.Profiles } },
      Jogos: { connect: { id: dto.Jogos } },
    };

    return this.prisma.profilesJogos.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.profilesJogos.delete({ where: { id } });
  }

  async findById(id: string) {
    const record = await this.prisma.profilesJogos.findUnique({
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
