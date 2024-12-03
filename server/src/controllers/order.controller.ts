import { Request, Response } from "express";
import knex from "../db/db";
import { getArticleByIdResponse, OrderArticleErrorResponse, OrderArticleRequestBody, OrderArticleResponse } from "../types/orderArticleType";


export const createOrderArticle = async (
  req: Request<{}, {}, OrderArticleRequestBody>,
  res: Response<OrderArticleResponse | OrderArticleErrorResponse>
): Promise<void> =>  {
  const { title, description, keywords, word_count, duration, complexity, language, quantity, cost, content_type } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized to create order article", error: null });
    return;
  }

  try {
    // Return only the 'id' field of the new record
    const [newOrder] = await knex("order_article")
      .insert({
        user_id: userId,
        title,
        description,
        keywords,
        word_count,
        duration,
        complexity,
        language,
        quantity,
        cost,
        content_type,
      })
      .returning("id"); 

    res.status(201).json({
      message: "Order article created successfully",
      orderId: newOrder.id, 
    });
  } catch (error) {
    console.error("Error creating order article:", error);
    res.status(500).json({
      message: "Error creating order article",
      error,
    });
  }
};



export const getOrderArticleById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response<getArticleByIdResponse | OrderArticleErrorResponse>
) => {
  const { id } = req.params; 
  const userId = req.user?.id; 

  if (!userId) {
    res.status(401).json({ message: "Unauthorized to access order", error: null });
    return;
  }

  try {
    
    const order = await knex("order_article")
      .select("id", "title", "description", "keywords", "word_count", "duration", "complexity", "language", "quantity", "cost", "content_type", "created_at", "is_paid")
      .where({ id, user_id: userId }) 
      .first();

    if (!order) {
      res.status(404).json({
        message: "Order not found or you do not have permission to access this order",
        error: null,
      });
      return;
    }

    res.status(200).json({
      message: "Order article retrieved successfully",
      order,
    });
  } catch (error) {
    console.error("Error retrieving order article:", error);
    res.status(500).json({
      message: "Error retrieving order article",
      error,
    });
  }
};

export const getAllUserOrders = async (
  req: Request<{}, {}, {}>,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;

  // Check if the user is authenticated
  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: You must be logged in to access orders",
    });
    return;
  }

  try {
    // Fetch all orders belonging to the logged-in user
    const orders = await knex("order_article")
      .select(
        "id",
        "title",
        "description",
        "keywords",
        "word_count",
        "duration",
        "complexity",
        "language",
        "quantity",
        "cost",
        "content_type",
        "created_at",
        "is_paid"
      )
      .where({ user_id: userId });

    // If no orders are found, return a success response with an appropriate message
    if (!orders || orders.length === 0) {
      res.status(200).json({
        success: true,
        message: "No orders found for this user",
        data: [],
      });
      return;
    }

    // Respond with the retrieved orders
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error retrieving user orders:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving user orders",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


// export const getAllUserOrders = async (
//   req: Request<{}, {}, {}>,
//   res: Response
// ): Promise<void> => {
//   const userId = req.user?.id;

//   // Check if the user is authenticated
//   if (!userId) {
//     res.status(401).json({
//       success: false,
//       message: "Unauthorized: You must be logged in to access orders",
//     });
//     return;
//   }

//   try {
//     // Fetch all orders belonging to the logged-in user
//     const orders = await knex("order_article")
//       .select(
//         "id",
//         "title",
//         "description",
//         "keywords",
//         "word_count",
//         "duration",
//         "complexity",
//         "language",
//         "quantity",
//         "cost",
//         "content_type",
//         "created_at",
//         "is_paid"
//       )
//       .where({ user_id: userId });

//     // If no orders are found, return a 404 response
//     if (!orders || orders.length === 0) {
//       res.status(404).json({
//         success: false,
//         message: "No orders found for this user",
//         data: [],
//       });
//       return;
//     }

//     // Respond with the retrieved orders
//     res.status(200).json({
//       success: true,
//       message: "Orders retrieved successfully",
//       data: { orders },
//     });
//   } catch (error) {
//     console.error("Error retrieving user orders:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error retrieving user orders",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };

export const updateOrderToPaid = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // `id` of the order_article entry
  const userId = req.user?.id; // Authenticated user ID

  if (!userId) {
    res.status(401).json({ message: "Unauthorized to access order", error: null });
    return;
  }

  // Validate paymentResult fields
  const { email, transactionId, payerId, amount } = req.body;
  let { status } = req.body;
  if (!status || !email || !transactionId || !payerId) {
    res.status(400).json({ message: "Invalid payment data provided", error: null });
    return;
  }

  let changeStatus;
  if (status === "COMPLETED") changeStatus = "Completed";
  status = changeStatus;

  try {
    // Start a transaction
    await knex.transaction(async (trx) => {
      // Fetch the order_article entry
      const orderArticle = await trx("order_article")
        .select(
          "id",
          "title",
          "description",
          "keywords",
          "word_count",
          "duration",
          "complexity",
          "language",
          "quantity",
          "cost",
          "content_type",
          "created_at",
          "is_paid"
        )
        .where({ id, user_id: userId })
        .first();

      if (!orderArticle) {
        throw new Error("Order not found or you do not have permission to access this order");
      }

      // Update the order_article table
      await trx("order_article").where({ id }).update({ is_paid: true });

      // Create or update the related order table entry
      const order = {
        id: orderArticle.id, // Use the same ID from order_article
        user_id: userId,
        paypal_transaction_id: transactionId,
        paypal_payer_id: payerId,
        payer_email: email,
        paypal_amount: amount, // Assuming the total amount comes from orderArticle.cost
        cost: orderArticle.cost,
        status,
        is_paid: true,
        updated_at: new Date(),
      };

      // Check if order already exists
      const existingOrder = await trx("order").where({ id: orderArticle.id }).first();

      if (existingOrder) {
        // Update the existing order
        await trx("order").where({ id: orderArticle.id }).update(order);
      } else {
        // Insert a new order
        await trx("order").insert(order);
      }

      // Fetch the updated order_article entry
      const updatedOrderArticle = await trx("order_article")
        .select(
          "id",
          "title",
          "description",
          "keywords",
          "word_count",
          "duration",
          "complexity",
          "language",
          "quantity",
          "cost",
          "content_type",
          "created_at",
          "is_paid"
        )
        .where({ id })
        .first();

      // Commit the transaction
      await trx.commit();

      res.status(200).json({
        message: "Order and payment details updated successfully",
        order: {
          ...updatedOrderArticle, // Return the updated `order_article`
          paymentDetails: {
            paypal_transaction_id: transactionId,
            paypal_payer_id: payerId,
            payer_email: email,
            status,
          },
        },
      });
    });
  } catch (error) {
    console.error("Error updating order to paid:", error);
    res.status(500).json({
      message: "An error occurred while updating the order to paid",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


