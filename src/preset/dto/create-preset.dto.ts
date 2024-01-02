import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class CreatePresetDto {

  @ApiProperty({
    example: 'bateria',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    required: true
  })
  favorite: boolean;

  @ApiProperty({
    example: 'bateria',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  icon: string;

  @ApiProperty({
    example: null,
    required: true
  })
  @IsNotEmpty()
  items: any;
}