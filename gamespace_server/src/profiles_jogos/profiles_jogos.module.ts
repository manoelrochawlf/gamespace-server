import { Module } from '@nestjs/common';
import { ProfilesJogosService } from './profiles_jogos.service';
import { ProfilesJogosController } from './profiles_jogos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProfilesJogosController],
  providers: [ProfilesJogosService],
})
export class ProfilesJogosModule {}
