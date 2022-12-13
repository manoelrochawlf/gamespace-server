import { Module } from '@nestjs/common';
import { generosService } from './generos.service';
import { generosController } from './generos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    PrismaModule,
    CaslModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [generosController],
  providers: [generosService],
})
export class generosModule {}
