import { Module } from '@nestjs/common';
import { RiderModule } from './rider/rider.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PresetModule } from './preset/preset.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/riderdb'), RiderModule, AuthModule, UserModule, NotificationsModule, PresetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
