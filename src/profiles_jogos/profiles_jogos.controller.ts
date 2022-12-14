import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfilesJogosService } from './profiles_jogos.service';
import { CreateProfilesJogoDto } from './dto/create-profiles_jogo.dto';
import { UpdateProfilesJogoDto } from './dto/update-profiles_jogo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('profiles-jogos')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profiles-jogos')
export class ProfilesJogosController {
  constructor(private readonly profilesJogosService: ProfilesJogosService) {}

  @Post()
  create(@Body() createProfilesJogoDto: CreateProfilesJogoDto) {
    return this.profilesJogosService.create(createProfilesJogoDto);
  }

  @Get()
  findAll() {
    return this.profilesJogosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesJogosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfilesJogoDto: UpdateProfilesJogoDto,
  ) {
    return this.profilesJogosService.update(id, updateProfilesJogoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.profilesJogosService.delete(id);
  }
}
