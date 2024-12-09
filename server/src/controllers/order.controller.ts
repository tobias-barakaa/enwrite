import { Request, Response } from "express";
import knex from "../db/db";
import { getArticleByIdResponse, OrderArticleErrorResponse, OrderArticleRequestBody, OrderArticleResponse } from "../types/orderArticleType";
import { v4 as uuidv4 } from "uuid"; 



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

  console.log(req.body, 'formats data received from the frontend');
  // Extract payment data from request body
  const { email, transactionId, payerId, amount } = req.body;
  let { status } = req.body;
  if (!status || !email || !transactionId || !payerId || !amount) {
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









export const createOrderArticleWithInvoice = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id; 
  const { title, description, quantity = 1, cost = 50 } = req.body; 

  if (!userId) {
    res.status(401).json({ message: "Unauthorized." });
    return;
  }

  try {
    // Start a transaction
    await knex.transaction(async (trx) => {
      // 1. Insert into `order_article` table
      const [orderArticleId] = await trx("order_article")
        .insert({
          id: uuidv4(), // Generate unique ID for the article.
          user_id: userId,
          title,
          description,
          quantity,
          cost,
          status: "Pending",
          is_paid: false,
        })
        .returning("id"); // Get the inserted article ID.

      // 2. Calculate total amount (quantity * cost)
      const totalAmount = quantity * cost;

      // 3. Generate unique invoice number (e.g., INV-{timestamp}-{random number})
      const invoiceNumber = `INV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

      // 4. Insert into `invoices` table
      await trx("invoices").insert({
        id: uuidv4(), // Generate unique ID for the invoice.
        invoice_number: invoiceNumber,
        order_article_id: orderArticleId,
        user_id: userId,
        total_amount: totalAmount,
        rate_per_order: 300, // Assuming this is fixed.
        
      });
    });

    res.status(201).json({ message: "Order article and invoice created successfully." });
  } catch (error) {
    console.error("Error creating order article and invoice:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};









// Types for TypeScript
interface Invoice {
  id: string;
  order_article_id: string;
  user_id: string;
  invoice_number: string;
  amount: number;
  quantity: number;
  description: string;
  payment_status: string;
  payment_date: Date | null;
  payment_method: string | null;
  transaction_id: string | null;
  billing_email: string | null;
  billing_name: string | null;
  billing_address: string | null;
  created_at: Date;
  updated_at: Date;
}

// Example query to get invoice for an order

export const getUserInvoices = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get user ID from authenticated request
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    // Fetch all invoices for the user with related order details
    const invoices = await knex('invoices')
      .select(
        'invoices.*',
        'order_article.title',
        'order_article.status as order_status'
      )
      .leftJoin('order_article', 'invoices.order_article_id', 'order_article.id')
      .where('invoices.user_id', userId)
      .orderBy('invoices.created_at', 'desc');

    // Respond with an empty array if no invoices are found
    if (!invoices.length) {
      res.status(200).json({
        message: 'No invoices found for this user',
        invoices: []
      });
      return;
    }

    // Respond with the invoices
    res.status(200).json({
      message: 'Invoices retrieved successfully',
      invoices
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({
      message: 'Error retrieving invoices',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};


const updateInvoicePayment = async (
  invoiceId: string, 
  paymentDetails: {
    transaction_id: string;
    payment_method: string;
    billing_email: string;
  }
) => {
  await knex('invoices')
    .where('id', invoiceId)
    .update({
      payment_status: 'Paid',
      payment_date: new Date(),
      ...paymentDetails
    });
};