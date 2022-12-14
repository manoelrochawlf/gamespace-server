import { Module } from '@nestjs/common';
import { jogosService } from './jogos.service';
import { jogosController } from './jogos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    PrismaModule,
    CaslModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [jogosController],
  providers: [jogosService],
})
export class jogosModule {}
