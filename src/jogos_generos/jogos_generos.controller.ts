import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JogosGenerosService } from './jogos_generos.service';
import { UpdateJogosGeneroDto } from './dto/update-jogos_genero.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateJogosGeneroDto } from './dto/create-jogos_genero.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('jogos-generos')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('jogos-generos')
export class JogosGenerosController {
  constructor(private readonly jogosGenerosService: JogosGenerosService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo relacionamento',
  })
  create(@Body() dto: CreateJogosGeneroDto) {
    return this.jogosGenerosService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Mostrar Gêneros dos jogos',
  })
  findAll() {
    return this.jogosGenerosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Mostrar Gêneros do jogo',
  })
  findOne(@Param('id') id: string) {
    return this.jogosGenerosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar Gênero do jogo',
  })
  update(
    @Param('id') id: string,
    @Body() updateJogosGeneroDto: UpdateJogosGeneroDto,
  ) {
    return this.jogosGenerosService.update(id, updateJogosGeneroDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar Gêneros do jogo',
  })
  delete(@Param('id') id: string) {
    return this.jogosGenerosService.delete(id);
  }
}
