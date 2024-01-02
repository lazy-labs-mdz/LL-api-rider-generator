import { Body, ConflictException, Controller, Get, Post, NotFoundException, Delete, Param, HttpCode, Request, ForbiddenException, Patch, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialOptions } from 'src/schemas/user.schema';
import { hashPassword } from 'src/utils/encryption';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth('XYZ')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  @Roles(Role.Admin)
  @ApiBody({
    description: "Traer todos los usuarios"
  })
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() { user }) {
    const { _id, roles } = user._doc;
    if (id === _id || roles.includes(Role.Admin)) {
      const userData = await this.userService.findById(id);
      if (!userData) throw new NotFoundException({message: "User not found"});
      return userData;
    } else {
      throw new ForbiddenException();
    }
  }

  @ApiBody({
    type: CreateUserDto,
    description: "Crear usuario",
  })
  @Post()
  @Roles(Role.Admin)
  async createUser(@Body() newUser: CreateUserDto) {
    const userExist = await this.userService.findUserByEmail(newUser.email);
    if (userExist) {
      throw new ConflictException('User already exists');
    }
    const userBody: CreateUserDto = {
      name: newUser.name,
      password: null,
      email: newUser.email,
      credential: newUser.credential,
      username: newUser.username,
      roles: newUser.roles
    }

    if (newUser.credential === CredentialOptions.basic) {
      const password = await hashPassword(newUser.password);
      userBody.password = password;
    }

    try {
      return await this.userService.createUser(userBody);
    } catch (error) {
      throw error;
    }
  }

  @ApiBody({
    type: UpdateUserDto,
    description: "Actualizar usuario",
  })
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateFields: UpdateUserDto, @Request() { user }) {
    const { _id, roles } = user._doc;
    if (id === _id || roles.includes(Role.Admin)) {
      const user = await this.userService.updateUser(id, updateFields);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } else {
      throw new ForbiddenException({ message: 'User not found' });
    }
  }

  @ApiBody({
    type: UpdateRoleDto,
    description: "Actualizar Rol",
  })
  @Patch(':id')
  @Roles(Role.Admin)
  async updateRol(@Param('id') id: string, @Body() data:UpdateRoleDto, @Request() { user }) {
    try {
      return this.userService.updateUser(id, data);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(Role.Admin)
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.deleteUser(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // @Put('upgrade/:id')
  // async upgradeUser(@Body() body:, @Param('id') id:string, @Request() {user}) {
  //   const {roles} = user._doc;
    
  // }
}
