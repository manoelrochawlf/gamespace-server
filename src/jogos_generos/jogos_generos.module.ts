import { Module } from '@nestjs/common';
import { JogosGenerosService } from './jogos_generos.service';
import { JogosGenerosController } from './jogos_generos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [JogosGenerosController],
  providers: [JogosGenerosService],
})
export class JogosGenerosModule {}
