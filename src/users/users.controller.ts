import { Body, ConflictException, Controller, Get, Post, NotFoundException, Delete, Param, HttpCode, Request, ForbiddenException, Patch, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialOptions } from 'src/schemas/user.schema';
import { hashPassword } from 'src/utils/encryption';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  @Roles(Role.Admin)
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() { user }) {
    const { _id, roles } = user._doc;
    if (id === _id || roles.includes(Role.Admin)) {
      return this.usersService.findById(id);
    } else {
      throw new ForbiddenException({ message: 'User not found' });
    }
  }

  @Post()
  @Roles(Role.Admin)
  async createUser(@Body() newUser: CreateUserDto) {
    const userExist = await this.usersService.findUserByEmail(newUser.email);
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
      return await this.usersService.createUser(userBody);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateFields: UpdateUserDto, @Request() { user }) {
    const { _id, roles } = user._doc;
    if (id === _id || roles.includes(Role.Admin)) {
      const user = this.usersService.updateUser(id, updateFields);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } else {
      throw new ForbiddenException({ message: 'User not found' });
    }
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async updateRol(@Param('id') id: string, @Body() data:UpdateRoleDto, @Request() { user }) {
    try {
      return this.usersService.updateUser(id, data);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(Role.Admin)
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.deleteUser(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
