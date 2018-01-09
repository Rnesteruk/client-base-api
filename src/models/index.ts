import * as mongoose from "mongoose";
import clientSheme from "./client";

const Client = mongoose.model("Client", clientSheme);

export {
  Client,
};
