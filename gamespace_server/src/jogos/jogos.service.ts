import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { UpdateJogosDto } from './dto/update-jogos.dto';

@Injectable()
export class jogosService {
  private jogosSelect = {
    id: true,
    Title: true,
    CoverImageUrl: true,
    Description: true,
    Year: true,
    ImdbScore: true,
    TrailerYouTubeUrl: true,
    GameplayYouTubeUrl: true,
    ProfilesJogos: true,
    JogosGeneros: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.jogos.findMany({
      select: this.jogosSelect,
    });
  }

  findOne(id: string) {
    return this.prisma.jogos.findUnique({ where: { id } });
  }

  create(dto: CreateJogosDto) {
    const data: Prisma.JogosCreateInput = {
      ...dto,
      Title: dto.Title,
      CoverImageUrl: dto.CoverImageUrl,
      Description: dto.Description,
      Year: dto.Year,
      ImdbScore: dto.ImdbScore,
      TrailerYouTubeUrl: dto.TrailerYouTubeUrl,
      GameplayYouTubeUrl: dto.GameplayYouTubeUrl,
    };

    return this.prisma.jogos
      .create({ data, select: this.jogosSelect })
      .catch(this.handleError);
  }

  async update(id: string, dto: UpdateJogosDto) {
    await this.findById(id);

    const data: Prisma.JogosUpdateInput = { ...dto };

    return this.prisma.jogos.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.jogos.delete({ where: { id } });
  }

  async findById(id: string) {
    const record = await this.prisma.jogos.findUnique({
      where: { id },
      select: this.jogosSelect,
    });
    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }
    return record;
  }

  handleError(error: Error) {
    console.log(error.message);

    return undefined;
  }
}
