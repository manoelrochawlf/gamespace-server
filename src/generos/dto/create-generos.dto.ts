import { ApiProperty } from '@nestjs/swagger';

export class CreateGenerosDto {
  @ApiProperty({
    description: 'O nome de um genero',
    example: 'Ação',
  })
  Name: string;
}
