import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateRiderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  items: any

}