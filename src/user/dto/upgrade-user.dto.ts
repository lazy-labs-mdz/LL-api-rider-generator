import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/roles/role.enum";

export class UpdateRoleDto {
  @ApiProperty({
    required: true,
    example: 'user | admin | user-premium'
  })
  roles: Role[];
}