import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateJogosGeneroDto {
  @ApiProperty({
    description: 'Gênero Id',
    example: '1332eb34-6945-43b7-858b-76125ce8fc00',
  })
  generosId: string;

  @ApiProperty({
    description: 'Jogos Id',
    example: '2de204af-b5b3-487f-a03c-cf74b44803fc',
  })
  jogosId: string;
}
