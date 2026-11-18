import { Router } from "express";
import { authRouter } from "../module/auth/auth.routes";

const router : Router = Router();

const moduleRoutes = [
    {
        path: "/auth",
        router: authRouter,
    }
]

moduleRoutes.forEach((moduleRoute) => {
    router.use(moduleRoute.path, moduleRoute.router);
})

export default router;