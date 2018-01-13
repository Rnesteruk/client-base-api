import { Router } from "express";
import { register, getUsers } from "./user";

const router = Router();

router.post("/users", register);
router.get("/users", getUsers);

export default router;