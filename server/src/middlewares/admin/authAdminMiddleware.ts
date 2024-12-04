import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import knex from "../../db/db"; // Adjust to match your DB connection file

export const protectAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    if (!process.env.ACCESS_SECRET) {
      throw new Error("ACCESS_SECRET is not defined");
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET) as jwt.JwtPayload;
    console.log(decoded, "Decoded Token");

    if (!decoded.id) {
      res.status(401).json({ message: "Unauthorized: Invalid token payload" });
      return;
    }

    // Fetch user with role
    const user = await knex("users")
      .join("roles", "users.role_id", "roles.id")
      .select("users.id", "users.username", "users.email", "roles.role_name")
      .where("users.id", decoded.id)
      .first();

    console.log(user, "Fetched User");

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }

    // Check for admin role
    if (user.role_name !== "admin") {
      res.status(403).json({ message: "Forbidden: You do not have admin access" });
      return;
    }

    // Attach the user to the request
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectAdmin middleware:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};




export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.jwt;
    console.log(token, 'how invalid token')
  
    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET as string) as { id: number };
      const user = await knex("users").where("id", decoded.id).first();
      
      if (!user) {
        res.status(401).json({ success: false, message: "Unauthorized: User not found" });
      }
      
      req.user = user; // Attach user to request object
      next(); // Pass control to the next middleware
    } catch (error) {
      res.status(401).json({ success: false, message: "Invalid token" });
    }
  };
