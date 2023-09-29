import { IsNotEmpty, IsString} from "class-validator";

export class CreatePresetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  favorite: boolean;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  items: any;
}