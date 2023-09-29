import { Module } from '@nestjs/common';
import { PresetController } from './preset.controller';
import { PresetService } from './preset.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Preset, PresetSchema } from 'src/schemas/preset.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Preset.name,
      schema: PresetSchema
    }
  ])],
  controllers: [PresetController],
  providers: [PresetService]
})
export class PresetModule {}
