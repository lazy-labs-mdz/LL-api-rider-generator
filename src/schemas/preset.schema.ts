import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps: true})
export class Preset {
  @Prop({required: true })
  name: string;

  @Prop({required: true})
  icon:string;

  @Prop({default: false})
  favorite: boolean
  
  @Prop({required: true, type: 'object'})
  items: object;

  @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
  accountId: string
}

export const PresetSchema = SchemaFactory.createForClass(Preset);