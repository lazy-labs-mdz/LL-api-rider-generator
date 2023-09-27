import { IsArray, IsEmail, IsString, MaxLength, MinLength, ValidateIf, isNotEmpty } from "class-validator";
import { Role } from "src/roles/role.enum";
import { CredentialOptions } from "src/schemas/user.schema";


export class CreateUserDto {
  @IsString()
  @MaxLength(15)
  name: string;

  @MaxLength(10)
  username: string;

  @IsEmail()
  email: string;

  @ValidateIf(o => o.credential === CredentialOptions.basic)
  @IsString()
  @MinLength(6)
  password: string;

  credential: CredentialOptions;
  
  @IsArray()
  roles: Role[];
}