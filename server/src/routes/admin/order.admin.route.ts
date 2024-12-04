import { Router } from "express";
import { authenticate, protectAdmin } from "../../middlewares/admin/authAdminMiddleware";
import { getAllOrders, getOrderById } from "../../controllers/admin/order.admin.controller";
import { protectUser } from "../../middlewares/authMiddleware";
import upload from "../../utils/multer"
import { uploadArticleFile } from "../../controllers/admin/upload/article.creation.upload";

const router = Router();


router.get("/v3/recent", protectAdmin, getAllOrders); 
router.get("/v3/getorderbyid/:id",authenticate, protectAdmin, getOrderById);
router.post('/upload',authenticate,protectUser, upload.single('file'), uploadArticleFile);




export default router;
