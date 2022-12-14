import { PartialType } from '@nestjs/swagger';
import { CreateJogosGeneroDto } from './create-jogos_genero.dto';

export class UpdateJogosGeneroDto extends PartialType(CreateJogosGeneroDto) {
  jogosId?: string;
}
