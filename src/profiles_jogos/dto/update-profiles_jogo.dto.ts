import { PartialType } from '@nestjs/swagger';
import { CreateProfilesJogoDto } from './create-profiles_jogo.dto';

export class UpdateProfilesJogoDto extends PartialType(CreateProfilesJogoDto) {}
