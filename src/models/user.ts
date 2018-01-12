import { Schema } from "mongoose";

const userShema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String
});

userShema.set("autoIndex", false);

userShema.methods.validPassword = function(password: string): boolean {
  return this.password === password;
};

export default userShema;