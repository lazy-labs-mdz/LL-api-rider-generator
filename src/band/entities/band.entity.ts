import { ShareAccountType } from "../types/band.type";

export class Band {
  title: string;
  description: string;
  shareAccount: ShareAccountType;
  riderIds: Array<string>;
}