import { Module } from '@nestjs/common';
import { RiderModule } from './rider/rider.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PresetModule } from './preset/preset.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/riderdb'),
    RiderModule,
    AuthModule,
    NotificationsModule,
    PresetModule,
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
