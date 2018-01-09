import { Schema } from "mongoose";

const clientShema: Schema = new Schema({
  name: String,
  code: Number
});

export default clientShema;