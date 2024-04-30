import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ timestamps: true })
export class Band {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: false, maxlength: 255, trim: true })
  description: string

  @Prop({ default: [] })
  shareAccount: [
    {
      editor: boolean,
      readonly: boolean
      accountId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
      }
    }
  ]

  @Prop({ default: [] })
  riderIds: [{
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider'
  }]

}

export const BandSchema = SchemaFactory.createForClass(Band);