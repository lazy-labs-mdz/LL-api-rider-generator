import { IsArray } from "class-validator";
import { Role } from "src/roles/role.enum";

export class UpdateRoleDto {
  @IsArray()
  roles: Role[]
}