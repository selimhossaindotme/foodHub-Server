import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../lib/auth";

export enum UserRole {
    Customer = "customer",
    Admin = "admin",
    Provider = "provider",
}

export enum UserStatus {
    Active = "active",
    Suspended = "suspended",
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: UserRole;
                status: UserStatus;
                name?: string;
            };
            session?: any;
        }
    }
}

export const authMiddleware = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await auth.api.getSession({
                headers: fromNodeHeaders(req.headers),
            });

            // Check if session exists
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized. Please sign in.",
                });
            }

            req.user = {
                id: session.user.id,
                email: session.user.email,
                role: session.user.role as UserRole,
                status: session.user.status as UserStatus,
                name: session.user.name,
            };
            req.session = session.session;

            // Check if user is suspended
            if (req.user.status === UserStatus.Suspended) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden. Your account has been suspended.",
                });
            }

            // Check role permissions if specified
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden. You do not have permission to access this resource.",
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};