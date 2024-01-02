import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MaxLength, MinLength, ValidateIf, isNotEmpty } from "class-validator";
import { Role } from "src/roles/role.enum";
import { CredentialOptions } from "src/schemas/user.schema";

export class UpdateUserDto {
  @ApiProperty({
    example: 'usuario 10',
    maxLength: 15
  })
  @IsString()
  @MaxLength(15)
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'usuario_10',
    maxLength: 10
  })
  @MaxLength(10)
  @IsOptional()
  username: string;

  @ApiProperty({
    example: 'usuario_10@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'asd12sKs',
  })
  @IsOptional()
  @ValidateIf(o => o.credential === CredentialOptions.basic)
  @IsString()
  @MinLength(6)
  password: string;
}