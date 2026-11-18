import { auth } from "../../../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import type { Request } from "express";

const getMe = async (req: Request) => {
    // Convert Express request headers to the format Better Auth expects
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });

    return session;
};

export const AuthService = {
    getMe,
};

