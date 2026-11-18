import type { Request, Response } from "express";

// GET /api/auth/me — returns the currently logged-in user & session
const getMe = async (req: Request, res: Response) => {
    if (!req.user) {
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
            user: req.user,
            session: req.session,
        },
    });
};

export const AuthController = {
    getMe,
};

