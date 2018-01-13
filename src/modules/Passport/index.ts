import * as passport from "passport";
import { Strategy as PassportStrategy } from "passport-strategy";
import localStrategy from "./local";
import jwtStrategy from "./jwt";

const defaults: PassportStrategy[] = [ localStrategy, jwtStrategy];

export default class Passport {
  constructor(private strategys: PassportStrategy[] = defaults) {}

  public init() {
    this.strategys.forEach(strategy => passport.use(strategy));
  }
}