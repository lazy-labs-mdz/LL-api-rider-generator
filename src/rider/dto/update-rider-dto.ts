import { IsBoolean, IsObject, IsOptional, IsString } from "class-validator";

export class UpdateRiderDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  favorite: boolean

  @IsOptional()
  @IsString()
  accountId: string

  @IsOptional()
  @IsObject()
  items: object;

  @IsOptional()
  @IsBoolean()
  isPublic: boolean

  @IsOptional()
  @IsObject()
  extraFields: object
}