import { Module } from '@nestjs/common';
import { BandService } from './band.service';
import { BandController } from './band.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Band, BandSchema } from 'src/schemas/band.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Band.name,
      schema: BandSchema
    }
  ])],
  controllers: [BandController],
  providers: [BandService]
})
export class BandModule {}
