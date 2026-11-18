import app from "./app";
import envVariables from "./config";
import { prisma } from "./lib/prisma";


const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");
        await app.listen(envVariables.PORT, () => {
            console.log(`Server is running on port ${envVariables.PORT}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

startServer();