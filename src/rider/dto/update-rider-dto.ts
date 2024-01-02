import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsObject, IsOptional, IsString } from "class-validator";

export class UpdateRiderDto {
  @ApiProperty({
    required: false,
    example: 'Banda completa'
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    example: true
  })
  @IsOptional()
  @IsBoolean()
  favorite: boolean

  @ApiProperty({
    required: false,
    example: "id de la cuenta"
  })
  @IsOptional()
  @IsString()
  accountId: string

  @ApiProperty({
    required: false,
    example: null
  })
  @IsOptional()
  @IsObject()
  items: object;

  @ApiProperty({
    required: false,
    example: false
  })
  @IsOptional()
  @IsBoolean()
  isPublic: boolean

  @ApiProperty({
    required: false,
    example: null
  })
  @IsOptional()
  @IsObject()
  extraFields: object
}