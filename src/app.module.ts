import { Module } from '@nestjs/common';
import { RiderModule } from './rider/rider.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PresetModule } from './preset/preset.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/riderdb'), RiderModule, AuthModule, UsersModule, NotificationsModule, PresetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
