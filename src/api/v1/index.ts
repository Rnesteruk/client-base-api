import { Router } from "express";

import admin from "./admin";
import { login, auth, refreshToken } from "./auth";
import { getClients, getClient, addClient, updateClient, deleteClient } from "./clients";

import * as mongosee from "mongoose";

const router = Router();

router.post("/login", login);

router.all("*", auth());
router.get("/token", refreshToken);
router.use("/admin", admin);

router.get("/clients", getClients);
router.post("/clients", addClient);
router.get("/clients/:id", getClient);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

export default router;
