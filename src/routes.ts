import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { IsAuthenticated } from "./middlewares/IsAuthenticadad";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { RemoveUserController } from "./controllers/user/RemoveUserController";

const router = Router();
router.get("/test", (request: Request, response: Response) => {
    return response.json({ ok: true });
});

// User
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', IsAuthenticated, new DetailUserController().handle);
router.delete('/user/remove', new RemoveUserController().handle);

export { router };
