import * as mongoose from "mongoose";
import * as autoIncrement from "mongoose-auto-increment";

autoIncrement.initialize(mongoose.connection);

import clientSheme from "./client";
import userShema from "./user";

import IUserModel from "../interfaces/models/IUserModel";
import IClientModel from "../interfaces/models/IClientModel";

const User = mongoose.model<IUserModel>("User", userShema);
const Client = mongoose.model<IClientModel>("Client", clientSheme);

export {
  User,
  Client,
};
