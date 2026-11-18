import type { Request, Response } from "express";
import { AuthService } from "./auth.service";

// GET /api/auth/me — returns the currently logged-in user & session
const getMe = async (req: Request, res: Response) => {
    const session = await AuthService.getMe(req);

    if (!session) {
        res.status(401).json({
            success: false,
            message: "Unauthorized. Please sign in.",
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: {
            user: session.user,
            session: session.session,
        },
    });
};

export const AuthController = {
    getMe,
};

