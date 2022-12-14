import {
  Delete,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/enum';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { UpdateJogosDto } from './dto/update-jogos.dto';
import { Jogos } from './entities/jogos.entity';
import { jogosService } from './jogos.service';
import { User } from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@ApiTags('jogos')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('jogos')
export class jogosController {
  constructor(
    private readonly jogosService: jogosService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas os jogos',
  })
  findAll() {
    return this.jogosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um jogo',
  })
  findOne(@Param('id') id: string) {
    return this.jogosService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Adicionar um jogo',
  })
  create(@Body() dto: CreateJogosDto, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Somente admnistradores!');
    }
    return this.jogosService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um jogo pelo ID',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateJogosDto,
    @LoggedUser() user: User,
  ) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Somente admnistradores!');
    }
    return this.jogosService.update(id, dto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover uma jogo pelo ID',
  })
  delete(@Param('id') id: string, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Somente admnistradores!');
    }
    this.jogosService.delete(id);
  }
}
