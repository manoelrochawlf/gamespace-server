import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateJogosDto {
  @IsString()
  @ApiProperty({
    description: 'O nome de um jogo!',
    example: 'GTA V',
  })
  Title: string;

  @IsString()
  @ApiProperty({
    description: 'A imagem de um jogo!',
    example:
      'https://www.dicasedetonados.com/ps4/grand-theft-auto-v/midia/2.jpg',
  })
  CoverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'A descrição de um jogo!',
    example: 'Grand Theft Auto V',
  })
  Description: string;

  @IsNumber()
  @ApiProperty({
    description: 'Ano do jogo',
    example: 2013,
  })
  Year: number;

  @IsNumber()
  @ApiProperty({
    description: 'A nota IMDB de um jogo (0 a 5)!',
    example: 5,
  })
  ImdbScore: number;

  @IsString()
  @ApiProperty({
    description: 'Link do trailer do jogo no youtube!',
    example: 'https://www.youtube.com/watch?v=QkkoHAzjnUs',
  })
  TrailerYouTubeUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Link da Gameplay do jogo, no youtube',
    example: 'https://www.youtube.com/watch?v=KfP8WyMs8PY',
  })
  GameplayYouTubeUrl: string;
}
