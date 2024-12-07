import { Router } from "express";
import { changePassword, passwordForgot, sendPasswordLink } from "../controllers/auth.forgot.password.controller";

const router = Router();

router.post('/sendpasswordlink', sendPasswordLink);
router.get('/passwordforgot/:id/:token', passwordForgot);
router.post('/:id/:token', changePassword);
// router.get('/profile', );


export default router;
