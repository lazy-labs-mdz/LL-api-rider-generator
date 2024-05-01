import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsObject, IsOptional, IsString } from "class-validator";

export class UpdateRiderDto {
  @ApiProperty({
    required: false,
    example: null
  })
  @IsOptional()
  @IsObject()
  items: object;

  @ApiProperty({
    required: false,
    example: null
  })
  @IsOptional()
  @IsObject()
  extraFields: object
}