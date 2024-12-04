import { Router } from "express";
import { createAdmin, getAllUsers } from "../../controllers/admin/auth.admin.controller";
import { authenticate, protectAdmin } from "../../middlewares/admin/authAdminMiddleware";

const router = Router();

router.post("/v5/admin", createAdmin); 
router.get('/v5/users', authenticate, protectAdmin, getAllUsers)


export default router;
