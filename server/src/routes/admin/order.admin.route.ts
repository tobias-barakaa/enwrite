import { Router } from "express";
import { authenticate, protectAdmin } from "../../middlewares/admin/authAdminMiddleware";
import { getAllOrders, getOrderById } from "../../controllers/admin/order.admin.controller";
import upload from "../../utils/multer"
import { getPDFContent, getUploadedArticles, uploadArticleFile } from "../../controllers/admin/upload/article.creation.upload";
import { protectUser } from "../../middlewares/authMiddleware";
import { UploadedArticle } from "../../types/orderArticleType";

const router = Router();


router.get("/v3/recent", protectAdmin, getAllOrders); 
router.get("/v3/getorderbyid/:id",authenticate, protectAdmin, getOrderById);
router.post('/upload',authenticate,protectAdmin, upload.single('file'), uploadArticleFile);
router.get('/completed', protectUser, getUploadedArticles); 
router.get('/contentpdf', protectUser, getPDFContent);




export default router;
