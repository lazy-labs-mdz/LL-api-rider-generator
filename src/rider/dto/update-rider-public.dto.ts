import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateRiderPublicDto {
  @ApiProperty({
    required: true,
    example: 'true | false'
  })
  @IsBoolean()
  isPublic: boolean;
}