import { Request, Response } from "express";
import knex from '../../db/db';

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await knex("order_article")
      .join("users", "order_article.user_id", "users.id")
      .select("order_article.id", "users.username", "order_article.cost as amount", "order_article.status", "order_article.is_paid");

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({
      message: "Error retrieving orders",
      error,
    });
  }
};


export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      
      const order = await knex("order_article")
        .join("users", "order_article.user_id", "users.id")
        .select(
            "order_article.id as order_id",
            "order_article.title",
            "order_article.description",
            "order_article.keywords",
            "order_article.word_count",
            "order_article.duration",
            "order_article.complexity",
            "order_article.language",
            "order_article.quantity",
            "order_article.cost",
            "order_article.status",
            "order_article.is_paid",
            "order_article.user_id",
            "users.username",
            "users.email",
            "order_article.created_at",
            "order_article.updated_at"
          )
        .where("order_article.id", id)
        .first(); // Ensure only one record is fetched
  
      // If no order is found, return a 404 error
      if (!order) {
        res.status(404).json({
          success: false,
          message: "Order not found",
        });
        return;
      }
  
      // Respond with the fetched order
      res.status(200).json({
        success: true,
        message: "Order retrieved successfully",
        data: order,
      });
    } catch (error) {
      console.error("Error retrieving order by ID:", error);
  
      // Handle any server errors
      res.status(500).json({
        success: false,
        message: "Error retrieving order",
        error: (error instanceof Error ? error.message : "Unknown error"),
      });
    }
  };
