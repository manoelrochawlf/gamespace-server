import { PartialType } from '@nestjs/swagger';
import { CreateJogosDto } from './create-jogos.dto';

export class UpdateJogosDto extends PartialType(CreateJogosDto) {}
