import { Router } from "express";
import { Client } from "../../models";

import admin from "./admin";
import auth from "./auth";

const router = Router();

router.use("/admin", admin);

router.post("/login", auth);

router.post("/client", (req, res) => {
  const client = new Client({
    name: "Name",
    code: 1111,
  });
  return client.save().then(val => {
    res.json(val);
  });
});

export default router;