import { Document } from "mongoose";

export default interface IClientModel extends Document {
  id: number;
  code: string;
  name: string;
  typeOfClient: string;
  personName: string;
  telephone: string;
  keyACSK: string;
  keyEndDate: Date;
  keySum: string;
  keyProses: string;
  keyResult: string;
  keyPay: string;
  program: string;
  programEndDate: Date;
  programSum: string;
  programProses: string;
  programResult: string;
  programPay: string;
  manager: string;
  comments: string;
  lastModify: Date;
}