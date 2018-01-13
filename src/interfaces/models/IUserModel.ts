import { Document } from "mongoose";

export default interface IUserModel extends Document {
  username: String;
  hash: String;
  validPassword(password: string): Promise<boolean>;
  setPassword(password: string): Promise<void>;
}