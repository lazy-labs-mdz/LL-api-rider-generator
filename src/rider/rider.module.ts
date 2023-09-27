import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Rider, RiderSchema } from 'src/schemas/rider.schema';
import { RiderController } from './rider.controller';
import { RiderService } from './rider.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Rider.name,
      schema: RiderSchema
    }
  ])],
  controllers: [RiderController],
  providers: [RiderService]
})
export class RiderModule {}
