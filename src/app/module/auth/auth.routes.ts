import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

// GET /api/auth/me — protected: any authenticated user
router.get("/me", authMiddleware(), AuthController.getMe);

export const authRouter: Router = router;
