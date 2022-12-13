import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from '@prisma/client';

@ApiTags('homepage')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Página inicial de jogos do perfil',
  })
  @Get(':id')
  findOne(@LoggedUser() user: User) {
    return this.homepageService.findById(user.id);
  }
}
