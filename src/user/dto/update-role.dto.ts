import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { Role } from "src/roles/role.enum";

export class UpdateRoleDto {
  @ApiProperty({
    required: true,
    example: 'user | admin | user-premium'
  })
  @IsArray()
  roles: Role[]
}