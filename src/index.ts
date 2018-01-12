import * as dotenv from "dotenv";
import * as express from "express";

import App from "./app";
import DB from "./modules/DB";
import Passport from "./modules/Passport";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.example" });

const db = new DB();
const passport = new Passport();
const server = new App(express(), passport);

db.connect();

server
  .init()
  .run();