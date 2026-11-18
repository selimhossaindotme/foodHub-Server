import express, { type Request, type Response } from "express";
import cors from "cors";
import envVariables from "./config";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";

const app: express.Application = express();

// middleware
app.use(cors(
    {
        origin: envVariables.APP_URL,
        credentials: true
    }
))
app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
})

export default app;