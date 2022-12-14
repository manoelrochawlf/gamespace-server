import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfilesDto } from './dto/create-profiles.dto';
import { UpdateProfilesDto } from './dto/update-profiles.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('profiles')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  @ApiOperation({
    summary: 'Ver todos os perfis',
  })
  findAll() {
    return this.profilesService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um perfil',
  })
  create(@Body() dto: CreateProfilesDto) {
    return this.profilesService.create(dto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Ver um perfil pelo ID!',
  })
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um perfil',
  })
  update(
    @Param('id') id: string,
    @Body() updateProfilesDto: UpdateProfilesDto,
  ) {
    return this.profilesService.update(id, updateProfilesDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar um perfil',
  })
  delete(@Param('id') id: string) {
    return this.profilesService.delete(id);
  }
}
