import { PartialType } from '@nestjs/swagger';
import { CreateGenerosDto } from './create-generos.dto';

export class UpdateGenerosDto extends PartialType(CreateGenerosDto) {}
