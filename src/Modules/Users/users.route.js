import { Router } from "express";
import { 
    signup, 
    login , 
    updateUser , 
    deleteUser , 
    GetAllUsers } from "./users.controller.js";
import { authMiddleware } from "../../middleware/auth.middlewares.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/", authMiddleware , updateUser);
router.delete("/", authMiddleware , deleteUser);
router.get("/", authMiddleware , GetAllUsers);
export { router as signup };
