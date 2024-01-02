import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { CredentialOptions } from "src/schemas/user.schema"

export class RegisterDto {

  @ApiProperty({
    example: 'Esteban',
    maxLength: 15
  })
  @IsString()
  @MaxLength(15)
  name?: string;

  @ApiProperty({
    example: 'esteban_10',
    maxLength: 10
  })
  @MaxLength(10)
  username?: string;

  @ApiProperty({
    example: 'esteban@gmail.com',
    required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'plnsirK102',
    required: true
  })
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiProperty({
    example: 'google | basic',
    required: true
  })
  credential: CredentialOptions;
}