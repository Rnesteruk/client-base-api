import { Router } from "express";
import { Client } from "../../models";

const router = Router();

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