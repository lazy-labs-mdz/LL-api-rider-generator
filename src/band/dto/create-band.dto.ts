import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ShareAccountType } from "../types/band.type";

export class CreateBandDto {
  @ApiProperty({
    required: true,
    example: "Electromecanicos"
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: false,
    example: "banda de los lunes"
  })
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    required: false,
    isArray: true
  })
  @IsArray()
  shareAccount: Array<ShareAccountType>

  @ApiProperty({
    required: false,
    isArray: true
  })
  @IsArray()
  riderIds: Array<string>

}
