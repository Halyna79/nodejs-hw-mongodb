import { Router } from "express";
import { getCurrentUserController } from "../controllers/user.controllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();
router.get('/current', authenticate, getCurrentUserController);
export default router;
