import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CredentialOptions } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { validatePassword } from 'src/utils/encryption';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Role } from 'src/roles/role.enum';
import { Payload } from './dto/signIn.dto';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, credential: CredentialOptions, password?: string, payload?: Payload ) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      if (credential === CredentialOptions.google) {
        try {
          await this.registerAccount({
            credential: CredentialOptions.google,
            email: email,
            password: null,
            name: payload?.name || "",
            username: payload?.username || "",
            roles: [Role.User]
          });
          this.signIn(email, credential);
        } catch (error) {
          throw new ConflictException({message: 'Error when registering the account, check if the fields are correct', error});
        }
      } else {
        throw new NotFoundException({message: "User or password is incorrect"});
      }
    }

    const { password: userPassword, ...result } = user;
    if (user.credential === CredentialOptions.basic) {
      if (user.credential !== credential) {
        throw new UnauthorizedException({message: 'Invalid credentials'});
      }
      if (await validatePassword(password, userPassword) === false) {
        throw new UnauthorizedException({message: 'User or password is incorrect'});
      }
    }
    return {
      access_token: await this.jwtService.signAsync(result),
    }
  }
  async registerAccount(createUser: CreateUserDto) {
    const user = await this.usersService.findUserByEmail(createUser.email);
    if (user) throw new ConflictException({message: 'The user you are trying to register has already been registered'});
    return await this.usersService.createUser(createUser);
  }
}
