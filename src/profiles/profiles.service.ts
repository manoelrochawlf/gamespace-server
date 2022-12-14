import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfilesDto } from './dto/create-profiles.dto';
import { UpdateProfilesDto } from './dto/update-profiles.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProfilesDto) {
    const data: Prisma.ProfilesCreateInput = {
      Title: dto.Title,
      ImageURL: dto.ImageURL,
      User: { connect: { id: dto.userId } },
    };

    return this.prisma.profiles
      .create({
        data,
        select: {
          id: true,
          Title: true,
          ImageURL: true,
          userId: true,
          ProfilesJogos: true,
        },
      })
      .catch(this.handleError);
  }

  findAll() {
    return this.prisma.profiles.findMany({
      select: {
        id: true,
        Title: true,
        ImageURL: true,
        userId: true,
        ProfilesJogos: true,
      },
    });
  }

  async findById(id: string) {
    const record = await this.prisma.profiles.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  findOne(id: string) {
    return this.prisma.profiles.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateProfilesDto) {
    await this.findById(id);

    const data: Prisma.ProfilesUpdateManyMutationInput = {
      ...dto,
      Title: dto.Title,
      ImageURL: dto.ImageURL,
    };

    return this.prisma.profiles.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    await this.prisma.profiles.delete({ where: { id } });
  }
  handleError(error: Error) {
    console.log(error.message);

    return undefined;
  }
}
