import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { IsAuthenticated } from "./middlewares/IsAuthenticated";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { RemoveUserController } from "./controllers/user/RemoveUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { EditCategoryController } from "./controllers/category/EditCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { RemoveCategoryController } from "./controllers/category/RemoveCategoryController";

const router = Router();
router.get("/test", (request: Request, response: Response) => {
    return response.json({ ok: true });
});

// User
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', IsAuthenticated, new DetailUserController().handle);
router.delete('/user/remove', new RemoveUserController().handle);

//Category
router.post('/category', IsAuthenticated, new CreateCategoryController().handle);
router.put('/category/edit', IsAuthenticated, new EditCategoryController().handle);
router.get('/category/all', IsAuthenticated, new ListCategoryController().handle);
router.delete('/category/remove', IsAuthenticated, new RemoveCategoryController().handle);

export { router };
