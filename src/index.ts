import * as dotenv from "dotenv";
import * as express from "express";

import App from "./app";
import DB from "./modules/DB";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.example" });

const db = new DB();
const server = new App(express());

db.connect();

server
  .init()
  .run();