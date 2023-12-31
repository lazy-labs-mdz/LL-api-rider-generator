import { Body, ConflictException, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './public.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Role } from 'src/roles/role.enum';
import { hashPassword } from 'src/utils/encryption';
import { CredentialOptions } from 'src/schemas/user.schema';
import { RegisterDto } from './dto/register-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signIn: SignInDto) {
    return this.authService.signIn(signIn.username, signIn.credential, signIn.password, signIn.payload);
  }
  
  @Public()
  @Post('register')
  async registerAccountBasic(@Body() newAccount: RegisterDto) {
    if (newAccount.credential === CredentialOptions.basic) {
      const dataUser = {
        ...newAccount,
        password: await hashPassword(newAccount.password),
        roles: [Role.User]
      }
      try {
        return await this.authService.registerAccount(dataUser);
      } catch (error) {
        throw error;
      }
    } else {
      throw new ConflictException({message: "not is possible to register account with this credential"});
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
