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
import { User } from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CreateGenerosDto } from './dto/create-generos.dto';
import { UpdateGenerosDto } from './dto/update-generos.dto';
import { Generos } from './entities/generos.entity';
import { generosService } from './generos.service';
import { Action } from 'src/casl/enum';

@ApiTags('generos')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('generos')
export class generosController {
  constructor(
    private readonly generosService: generosService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas os gêneros',
  })
  findAll() {
    return this.generosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um gênero',
  })
  findOne(@Param('id') id: string) {
    return this.generosService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Adicionar um gênero',
  })
  create(@Body() dto: CreateGenerosDto, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Somente admnistradores!');
    }
    return this.generosService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um gênero pelo ID',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGenerosDto,
    @LoggedUser() user: User,
  ) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Somente admnistradores!');
    }
    return this.generosService.update(id, dto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover uma gênero pelo ID',
  })
  delete(@Param('id') id: string, @LoggedUser() user: User) {
    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.Create, user);
    if (!isAllowed) {
      throw new ForbiddenException('Somente admnistradores!');
    }
    this.generosService.delete(id);
  }
}
