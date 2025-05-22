import { Router } from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
} from "../Controller/UserController";

const router = Router();

router.post("/", createUser); // POST /api/user/
router.post("/login", loginUser); // POST /api/user/login
router.get("/", getAllUsers); // GET  /api/user/

export default router;
