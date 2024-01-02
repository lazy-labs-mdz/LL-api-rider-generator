import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import { CredentialOptions } from 'src/schemas/user.schema';

export type Payload = {
  name: string;
  username: string;
}
export class SignInDto {
  @ApiProperty({
    example: 'esteban_10',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'plnsirK102',
    description: "solo lleva password si la credencial es basic",
    required: true
  })
  @ValidateIf(o => o.credential === CredentialOptions.basic)
  @IsString()
  password?: string;

  @ApiProperty({
    example: 'basic',
    description: "basic | google",
    required: true
  })
  @IsString()
  @IsNotEmpty()
  credential: CredentialOptions

  payload?: Payload;
}