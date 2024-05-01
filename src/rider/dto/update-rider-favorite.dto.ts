import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateRiderFavoriteDto {
  @ApiProperty({
    required: true,
    example: 'true | false'
  })
  @IsBoolean()
  favorite: boolean;
}