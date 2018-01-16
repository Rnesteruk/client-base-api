import * as mongoose from "mongoose";
(<any>mongoose).Promise = Promise;

export default class DB {
  constructor() {}
  connect() {
    const mongoUrl = process.env.MONGODB_URI;

    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }

    return mongoose.connect(mongoUrl, { config: {autoIndex: false}, useMongoClient: true}).then(
      () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch(err => {
      console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
      // process.exit();5
    });
  }
}