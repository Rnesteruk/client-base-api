import { Schema } from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const userShema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  }
}, {
  autoIndex: false
});

userShema.methods.validPassword = function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.hash);
};

userShema.methods.setPassword = async function(password: string): Promise<void> {
  this.hash = await bcrypt.hash(password, 7);
};

userShema.virtual("token").get(function () {
  const secret = process.env.JWT_SECRET || "jwt-secret-key";
  const expiresIn = process.env.JWT_EXPIRES || "3h";
  return jwt.sign({
    username: this.username,
  },
  secret,
  { expiresIn });
});

export default userShema;