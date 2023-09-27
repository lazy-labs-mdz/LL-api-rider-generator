import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import { Role } from "src/roles/role.enum";

export enum CredentialOptions {
  google = "google",
  basic = "basic"
}
@Schema({timestamps: true})
export class User {
  @Prop({required: true, trim: true, })
  name: string;

  @Prop({required: true, unique: true})
  username: string;
  
  @Prop({required: true, unique: true})
  email: string;

  @Prop({})
  password: string;

  @Prop({default: true})
  active: boolean
  @Prop({required: true})
  credential: CredentialOptions;

  @Prop({default: [Role.User]})
  roles: Role[]
}

export const UserSchema = SchemaFactory.createForClass(User);