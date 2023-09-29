import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatePresetDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsOptional()
  favorite: boolean;

  @IsOptional()
  icon:string

  @IsOptional()
  @IsNotEmpty()
  items: any;

  @IsOptional()
  @IsString()
  accountId: string;
}