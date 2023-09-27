import { Module } from '@nestjs/common';
import { RiderModule } from './rider/rider.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { NotificationsModule } from './notifications/notifications.module';
import { NorificationsService } from './norifications/norifications.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/riderdb'), RiderModule, AuthModule, UsersModule, NotificationsModule],
  controllers: [],
  providers: [NorificationsService],
})
export class AppModule {}
