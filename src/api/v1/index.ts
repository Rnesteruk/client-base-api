import { Router } from "express";

import admin from "./admin";
import { login, auth } from "./auth";

const router = Router();

router.post("/login", login);

router.use("/admin", auth(), admin);

export default router;