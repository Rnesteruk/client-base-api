import { Document } from "mongoose";

export default interface IUserModel extends Document {
  username: String;
  password: String;
  validPassword(password: string): boolean;
}