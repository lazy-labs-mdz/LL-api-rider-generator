import { IsEmail, IsOptional, IsString, MaxLength, MinLength, ValidateIf, isNotEmpty } from "class-validator";
import { Role } from "src/roles/role.enum";
import { CredentialOptions } from "src/schemas/user.schema";

export class UpdateUserDto {
  @IsString()
  @MaxLength(15)
  @IsOptional()
  name: string;

  @MaxLength(10)
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @ValidateIf(o => o.credential === CredentialOptions.basic)
  @IsString()
  @MinLength(6)
  password: string;
}