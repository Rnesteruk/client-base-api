import { Application, Request, Response, NextFunction } from "express";
import * as errorHandler from "errorhandler";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import Passport from "./modules/Passport";
import api from "./api/v1";
import expressValidator = require("express-validator");
export default class App {
  constructor(public app: Application, private passport: Passport) {}

  public init() {
    this.passport.init();
    this.config();
    this.api();
    this.errorHandle();

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
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(passport.initialize());
    this.app.use(expressValidator());
    this.app.use(logger("dev"));
  }

  private errorHandle() {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const { statusCode } = res;
      const status = statusCode === 200 ? 400 : statusCode;
      const data = {
        status,
        error: true,
        message: err.message,
      };

      res
        .status(status)
        .json(data);
    });
  }

  private api() {
    this.app.use("/api/v1", api);
  }
}