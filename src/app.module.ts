import { Module } from '@nestjs/common';
import { RiderModule } from './rider/rider.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PresetModule } from './preset/preset.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { BandModule } from './band/band.module';


@Module({
  imports: [
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
    }),
    BandModule,
    MongooseModule.forRoot(process.env.MONGO_URI)
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
