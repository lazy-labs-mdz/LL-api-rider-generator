import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateRiderNameDto {
  @ApiProperty({
    required: true,
    example: 'Banda completa',
    maxLength: 30
  })
  @IsString()
  name: string;
}