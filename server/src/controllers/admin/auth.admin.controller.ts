import { NextFunction, Request, Response } from "express";
import knex from "../../db/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { generateToken } from "../../utils/generateToken";



interface User {
    id: number;
    role_id: number;
    username: string;
    email: string;
    password: string;
    profile_pic?: string;
    balance: number;
    created_at?: Date;
    clientRole?: string;
  }
  
  interface CreateUserRequest {
    id: number;
    role_id: number;
    username: string;
    email: string;
    password: string;
    profile_pic?: string;
    balance: number;
    created_at?: Date;
    clientRole?: string;
  }

export const createAdmin = async (
    req: Request<{}, {}, CreateUserRequest>,
    res: Response
): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        // Sanitize input
        const sanitizedUsername = username.trim().toLowerCase();
        const sanitizedEmail = email.trim().toLowerCase();

        // Transaction for atomic operations
        const newAdmin = await knex.transaction(async (trx) => {
            // Check for existing email
            const existingUser = await trx("users").where({ email: sanitizedEmail }).first();
            if (existingUser) throw new Error("Email already exists");

            // Check for existing username
            const existingUsername = await trx("users").where({ username: sanitizedUsername }).first();
            if (existingUsername) throw new Error("Username already exists");

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Fetch admin role
            const adminRole = await trx("roles").where({ role_name: "admin" }).first();
            if (!adminRole) throw new Error("Admin role not found");

            // Insert admin user
            const [insertedAdmin] = await trx("users")
                .insert({
                    role_id: adminRole.id, // Always assign admin role
                    username: sanitizedUsername,
                    email: sanitizedEmail,
                    password: hashedPassword,
                    profile_pic: `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`,
                    balance: 0.0,
                    created_at: trx.fn.now(),
                })
                .returning(["id", "role_id", "username", "email", "profile_pic", "created_at"]);

            return insertedAdmin;
        });

        // Generate JWT and set cookie
        generateToken(res, newAdmin.id);

        // Respond with success
        res.status(201).json({
            success: true,
            message: "Admin created successfully.",
            data: { admin: newAdmin },
        });
    } catch (error: any) {
        // Error response
        const statusCode = error.message === "Email already exists" || error.message === "Username already exists" ? 409 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || "Error creating admin.",
        });
    }
};
