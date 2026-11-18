import dotenv from "dotenv";
dotenv.config();

const envVariables = {
    PORT: process.env.PORT || 5000 as number,
    DATABASE_URL: process.env.DATABASE_URL || "" as string,
    APP_URL: process.env.APP_URL || "http://localhost:3000" as string,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || "" as string,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:5000" as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "" as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "" as string,
};

export default envVariables;