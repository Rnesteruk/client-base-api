import * as passport from "passport";
import { Strategy as PassportStrategy } from "passport-strategy";
import { Strategy as LocalStrategy } from "passport-local";
import local from "./local";

const localStrategy = new LocalStrategy(local);
const defaults: PassportStrategy[] = [ localStrategy ];

export default class Passport {
  constructor(private strategys: PassportStrategy[] = defaults) {}

  public init() {
    this.strategys.forEach(strategy => passport.use(strategy));
  }
}