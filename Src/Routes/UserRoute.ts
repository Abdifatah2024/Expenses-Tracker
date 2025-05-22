import { Router } from "express";
import { createUser, getAllUsers } from "../Controller/UserController";

const router = Router();

router.post("/CreateUser", createUser);
router.get("/", getAllUsers);

export default router;
