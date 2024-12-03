import { Router } from "express";
import { createOrderArticleValidation } from "../middlewares/articleValidation";
import { createOrderArticle, getAllUserOrders, getOrderArticleById, updateOrderToPaid } from "../controllers/order.controller";
import { protect } from "../utils/user.authenticate";
import { protectUser } from "../middlewares/authMiddleware";
import { Request, Response } from "express";



const router = Router();

router.post("/v2/create-order", createOrderArticleValidation, protectUser, createOrderArticle);
router.get("/v2/getone/:id",protectUser, getOrderArticleById); 
router.get("/v2/getall", protectUser, getAllUserOrders);
router.put("/v2/update/:id", protectUser, updateOrderToPaid);

router.get('/config/paypal', (req: Request, res: Response): void => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
  });
  

export default router;
