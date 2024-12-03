import { Router } from "express";
import { createUser, login, logout} from "../controllers/auth.controller";
import validateCreateUser from "../middlewares/userValidation";

const router = Router();

router.post("/v1/users", validateCreateUser, createUser); 
router.post("/v2/logs/login", login); 
router.post('/v2/logs/logout', logout);
// router.get('/profile', );


export default router;
