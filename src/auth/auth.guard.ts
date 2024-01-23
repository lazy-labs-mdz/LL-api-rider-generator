import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import clerkClient from '@clerk/clerk-sdk-node';
import clerk from '@clerk/clerk-sdk-node';

export class JwtAuthGuard implements CanActivate {

  constructor() { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = this.extractTokenFromHeader(request);

    try {         
      const client = await clerk.clients.verifyClient(token);
      const session = await clerkClient.sessions.getSession(client.lastActiveSessionId);
      
      let user:any = request.cookies?.[`__session__${session.userId}`]
      if (!user) {
        user = await clerkClient.users.getUser(session.userId);
        response.cookie(`__session__${session.userId}`, user);
      }
      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}