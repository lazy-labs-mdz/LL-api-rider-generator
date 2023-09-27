import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CredentialOptions } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { validatePassword } from 'src/utils/encryption';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, password?: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) throw new NotFoundException({message: "user or password is incorrect"});
    const { password: userPassword, ...result } = user;
    if (user.credential === CredentialOptions.basic) {
      if (await validatePassword(password, userPassword) === false) {
        throw new UnauthorizedException({message: 'user or password is incorrect'});
      }
    }
    return {
      access_token: await this.jwtService.signAsync(result),
    }
  }
}
