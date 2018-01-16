import { Schema } from "mongoose";
import * as autoIncrement from "mongoose-auto-increment";

const clientShema: Schema = new Schema({
  id: {
    type: Number,
    index: true,
    unique: true,
  },
  code: String,
  name: String,
  typeOfClient: String,
  personName: String,
  telephone: String,
  keyACSK: String,
  keyEndDate: Date,
  keySum: String,
  keyProses: String,
  keyResult: String,
  keyPay: String,
  program: String,
  programEndDate: Date,
  programSum: String,
  programProses: String,
  programResult: String,
  programPay: String,
  manager: String,
  comments: String,
  lastModify: { type: Date, default: Date.now },
}, {
  autoIndex: false
});

clientShema.pre("findOneAndUpdate", function() {
  this.update({}, { $set: { lastModify: new Date() } });
});

clientShema.plugin(autoIncrement.plugin, { model: "Client", field: "id" });

export default clientShema;