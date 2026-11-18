import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

// GET /api/auth/me
router.get("/me", AuthController.getMe);

export const authRouter: Router = router;
