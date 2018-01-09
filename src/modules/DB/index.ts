import * as mongoose from "mongoose";
(<any>mongoose).Promise = Promise;

export default class DB {
  constructor() {}
  connect() {
    const mongoUrl = process.env.MONGODB_URI;

    return mongoose.connect(mongoUrl, {useMongoClient: true}).then(
      () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch(err => {
      console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
      // process.exit();5
    });
  }
}