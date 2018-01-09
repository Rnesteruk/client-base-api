import { Application } from "express";
import * as errorHandler from "errorhandler";
import api from "./api/v1";

export default class App {
  constructor(public app: Application) {}

  public init() {
    this.config();
    this.api();

    return this;
  }

  public run() {
    const port = this.app.get("port");
    const env = this.app.get("env");

    return this.app.listen(port, () => {
      console.log(("  App is running at http://localhost:%d in %s mode"), port, env);
      console.log("  Press CTRL-C to stop\n");
    });
  }

  private config() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(errorHandler());
  }

  private api() {
    this.app.use("/api/v1", api);
  }
}