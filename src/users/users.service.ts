import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async getAll() {
    return await this.userModel.find();
  }
  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email: email });
  }

  async createUser(newUser: CreateUserDto) {
    return await this.userModel.create(newUser);
  }

  async updateUser(id:string, user) {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true })
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
