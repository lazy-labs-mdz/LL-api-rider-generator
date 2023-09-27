import { IsNotEmpty, IsString, MinLength, ValidateIf } from 'class-validator'
import { CredentialOptions } from 'src/schemas/user.schema';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @ValidateIf(o => o.credential === CredentialOptions.basic)
  @IsString()
  password: string;

  credential: CredentialOptions
}