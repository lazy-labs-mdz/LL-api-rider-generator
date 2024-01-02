import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateRiderDto {
  @ApiProperty({
    required: true,
    example: "Banda Completa"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: null
  })
  @IsNotEmpty()
  items: any

}