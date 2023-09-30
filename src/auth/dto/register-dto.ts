import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { CredentialOptions } from "src/schemas/user.schema"

export class RegisterDto {
  @IsString()
  @MaxLength(15)
  name?: string;

  @MaxLength(10)
  username?: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password?: string;

  credential: CredentialOptions;
}