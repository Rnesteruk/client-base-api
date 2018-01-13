import { Schema } from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jwt-simple";

const userShema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  }
});

userShema.set("autoIndex", false);

userShema.methods.validPassword = function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.hash);
};

userShema.methods.setPassword = async function(password: string): Promise<void> {
  this.hash = await bcrypt.hash(password, 7);
};

userShema.virtual("token").get(function () {
  const secret = process.env.JWT_SECRET;
  const token =  jwt.encode({
    username: this.username,
  }, secret);
  return `Bearer ${token}`;
});

export default userShema;