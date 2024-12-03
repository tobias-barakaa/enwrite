import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import knex from "../db/db";
import { UserTypes } from "../types/userType";

declare global {
    namespace Express {
        interface Request {
            user?: UserTypes; 
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies["access_token"];
        if (!token) {
            res.status(401).json({ message: "Unauthenticated" });
            return;
        }

        const decoded = verify(token, process.env.ACCESS_SECRET || "default_access_secret");
        if (!decoded) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }

        const user = await knex("users").where({ id: (decoded as { id: string }).id }).first();
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        req.user = user; 
        next();
    } catch (error) {
        console.error("Error in protect middleware:", error);
        res.status(500).json({ message: "Error verifying token" });
    }
};
