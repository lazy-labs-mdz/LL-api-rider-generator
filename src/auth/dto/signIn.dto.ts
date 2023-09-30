import { IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import { CredentialOptions } from 'src/schemas/user.schema';

export type Payload = {
  name: string;
  username: string;
}
export class SignInDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @ValidateIf(o => o.credential === CredentialOptions.basic)
  @IsString()
  password?: string;

  @IsString()
  @IsNotEmpty()
  credential: CredentialOptions

  payload?: Payload;
}