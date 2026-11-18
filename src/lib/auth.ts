import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import envVariables from "../config";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
    }),
    secret: envVariables.BETTER_AUTH_SECRET,
    baseURL: envVariables.BETTER_AUTH_URL,
    trustedOrigins: [envVariables.APP_URL, envVariables.BETTER_AUTH_URL],
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "customer",
                required: false,
            },
            status: {
                type: "string",
                defaultValue: "active",
                required: false,
            },
        }
    }


});