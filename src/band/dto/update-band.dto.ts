import { Prop } from "@nestjs/mongoose";
import mongoose from "mongoose";

export class UpdateBasicBandDto {
  @Prop({ trim: true, })
  title: string;
  @Prop({ default: false, maxlength: 255, trim: true })
  description: string
}

export class UpdateShareAccountDto {
  @Prop({ trim: true, required: true })
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
}

export class UpdateRiderIdsDto {
  @Prop({ trim: true, required: true })
  riderIds: [{
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider'
  }]
}