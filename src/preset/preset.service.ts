import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Preset } from 'src/schemas/preset.schema';
import { UpdatePresetDto } from './dto/update-preset.dto';

@Injectable()
export class PresetService {
  constructor(@InjectModel(Preset.name) private presetModel: Model<Preset>) { }

  getAllPresets() {
    return this.presetModel.find();
  }

  getById(id:string){
    return this.presetModel.findById(id);
  }
  getMyPreset(accountId: string) {
    return this.presetModel.find({ accountId });
  }

  async create(name: string, items: string, accountId: string, favorite: boolean = false, icon:string) {
    const newPreset = new this.presetModel({
      name,
      items,
      accountId,
      favorite,
      icon
    });
    return await newPreset.save();
  }

  async update(id: string, updateFields: UpdatePresetDto) {
    return this.presetModel.findByIdAndUpdate(id, updateFields, { new: true });
  }

  async deletePreset(id: string) {
    return this.presetModel.findByIdAndRemove(id);
  }
}
