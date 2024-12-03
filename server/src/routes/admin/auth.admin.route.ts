import { Router } from "express";
import { createAdmin } from "../../controllers/admin/auth.admin.controller";

const router = Router();

router.post("/v5/admin", createAdmin); 


export default router;
