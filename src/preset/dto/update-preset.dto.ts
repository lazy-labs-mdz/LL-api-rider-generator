import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatePresetDto {

  @ApiProperty({
    example: 'bateria',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: false,
    required: true
  })
  @IsOptional()
  favorite: boolean;

  @ApiProperty({
    example: 'bateria',
    required: true
  })
  @IsOptional()
  icon:string

  @ApiProperty({
    example: null,
    required: true
  })
  @IsOptional()
  @IsNotEmpty()
  items: any;
}