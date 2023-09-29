import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Rider } from "src/schemas/rider.schema";
import { UpdateRiderDto } from "./dto/update-rider-dto";

@Injectable()
export class RiderService {
  constructor(@InjectModel(Rider.name) private riderModel: Model<Rider>) {}

  getAll() {
    return this.riderModel.find();
  }

  async findOne(id: string) {
    return this.riderModel.findById(id);
  }

  async findMyRiders(accountId: string) {
    return this.riderModel.find({accountId}).select('name createdAt updatedAt isPublic favorite');
  }

  async createRider(name: string, items: any, accountId: string) {
    const newRider = new this.riderModel({
      name,
      items,
      accountId
    });
    return await newRider.save();
  }

  async updateRider(id:string, updateFields: UpdateRiderDto) {
    return await this.riderModel.findByIdAndUpdate(id, updateFields, { new: true });
  }

  async deleteRider(id: string) {
    return this.riderModel.findByIdAndRemove(id);
  }

}