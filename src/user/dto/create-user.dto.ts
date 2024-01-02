import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";
import { Role } from "src/roles/role.enum";
import { CredentialOptions } from "src/schemas/user.schema";


export class CreateUserDto {
  @ApiProperty({
    required: false,
    example: 'usuario 1',
    maxLength: 15
  })
  @IsString()
  @MaxLength(15)
  name?: string;

  @ApiProperty({
    required: false,
    example: 'usuario_1',
    maxLength: 10
  })
  @MaxLength(10)
  username?: string;

  @ApiProperty({
    required: true,
    example: 'usuario_1@gmail.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: 'pasm12aaaas',
    minLength: 6
  })
  @ValidateIf(o => o.credential === CredentialOptions.basic)
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiProperty({
    required: true,
    example: 'google | basic',
  })
  credential: CredentialOptions;
  
  @ApiProperty({
    required: true,
    example: 'user | admin | user-premium'
  })
  @IsArray()
  roles: Role[];
}