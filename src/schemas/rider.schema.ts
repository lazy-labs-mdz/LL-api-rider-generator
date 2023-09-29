import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps: true})
export class Rider {
  @Prop({required: true, trim: true, })
  name: string;

  @Prop({default: false})
  favorite: boolean

  @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
  accountId: string

  @Prop({required: true, type: 'object'})
  items: object;

  @Prop({default: false})
  isPublic: boolean

  @Prop({type: 'object'})
  extraFields: object
}

export const RiderSchema = SchemaFactory.createForClass(Rider);