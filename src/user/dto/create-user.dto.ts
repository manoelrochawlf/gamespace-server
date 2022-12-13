import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  id?: string;

  @IsString()
  @ApiProperty({
    description: 'O nome de um usúario',
    example: 'Maxsuel',
  })
  Name: string;

  @IsUrl()
  @ApiProperty({
    description: 'O email de um usúario',
    example: 'zeleandro@gmail.com',
  })
  Email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'A senha de um usúario!',
    example: 'ihidsf',
  })
  Password: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'Repita a senha!',
    example: 'ihidsf',
  })
  ConfirmPassword: string;

  @IsString()
  @ApiProperty({
    description: ' Email de um usúario!',
    example: '076-435-345.56',
  })
  Cpf: string;

  @IsBoolean()
  @ApiProperty({
    description: 'O nome de um usúario',
    example: 'true',
  })
  isAdmin?: boolean;
  ProfilesJogos?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}
