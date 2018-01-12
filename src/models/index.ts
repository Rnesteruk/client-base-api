import * as mongoose from "mongoose";
import clientSheme from "./client";
import userShema from "./user";

import IUserModel from "../interfaces/models/IUserModel";

const User = mongoose.model<IUserModel>("User", userShema);
const Client = mongoose.model("Client", clientSheme);

export {
  User,
  Client,
};
