import { NextFunction, Request, Response } from "express";
import knex from "../db/db";
import { UserTypes } from "../types/userType";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { generateToken } from "../utils/generateToken";



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


  // export const createUser = async (
  //   req: Request<{}, {}, CreateUserRequest>,
  //   res: Response
  // ): Promise<void> => {
  //   const { username, email, password } = req.body;
  
  //   try {
  //     // Sanitize input
  //     const sanitizedUsername = username.trim().toLowerCase();
  //     const sanitizedEmail = email.trim().toLowerCase();
  
  //     // Transaction for atomic operations
  //     const newUser = await knex.transaction(async (trx) => {
  //       // Check for existing email
  //       const existingUser = await trx("users").where({ email: sanitizedEmail }).first();
  //       if (existingUser) throw new Error("Email already exists");
  
  //       // Check for existing username
  //       const existingUsername = await trx("users").where({ username: sanitizedUsername }).first();
  //       if (existingUsername) throw new Error("Username already exists");
  
  //       // Hash password
  //       const hashedPassword = await bcrypt.hash(password, 10);
  
  //       // Fetch client role
  //       const clientRole = await trx("roles").where({ role_name: "admin" }).first();
  //       if (!clientRole) throw new Error("Client role not found");
      
  //       // Insert user
  //       const [insertedUser] = await trx("users")
  //         .insert({
  //           role_id: clientRole.id,
  //           username: sanitizedUsername,
  //           email: sanitizedEmail,
  //           password: hashedPassword,
  //           profile_pic: `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`,
  //           balance: 0.0,
  //           created_at: trx.fn.now(),
  //         })
  //         .returning(["id", "role_id", "username", "email", "profile_pic", "created_at"]);
  
  //       return insertedUser;
  //     });
  
  //     // Generate JWT and set cookie
  //     generateToken(res, newUser.id);
  
  //     // Respond with success
  //     res.status(201).json({
  //       success: true,
  //       message: "User created successfully.",
  //       data: { user: newUser },
  //     });
  //   } catch (error: any) {
  //     // Error response
  //     const statusCode = error.message === "Email already exists" || error.message === "Username already exists" ? 409 : 500;
  //     res.status(statusCode).json({
  //       success: false,
  //       message: error.message || "Error creating user.",
  //     });
  //   }
  // };
  
  
  export const createUser = async (
    req: Request<{}, {}, CreateUserRequest>,
    res: Response
  ): Promise<void> => {
    const { username, email, password } = req.body;
  
    try {
      // Sanitize input
      const sanitizedUsername = username.trim().toLowerCase();
      const sanitizedEmail = email.trim().toLowerCase();
  
      // Transaction for atomic operations
      const newUser = await knex.transaction(async (trx) => {
        // Check for existing email
        const existingUser = await trx("users").where({ email: sanitizedEmail }).first();
        if (existingUser) throw new Error("Email already exists");
  
        // Check for existing username
        const existingUsername = await trx("users").where({ username: sanitizedUsername }).first();
        if (existingUsername) throw new Error("Username already exists");
  
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Fetch client role
        const clientRole = await trx("roles").where({ role_name: "client" }).first();
        if (!clientRole) throw new Error("Client role not found");
  
        // Insert user
        const [insertedUser] = await trx("users")
          .insert({
            role_id: clientRole.id,
            username: sanitizedUsername,
            email: sanitizedEmail,
            password: hashedPassword,
            profile_pic: `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`,
            balance: 0.0,
            created_at: trx.fn.now(),
          })
          .returning(["id", "role_id", "username", "email", "profile_pic", "created_at"]);
  
        return insertedUser;
      });
  
      // Generate JWT and set cookie
      generateToken(res, newUser.id);
  
      // Respond with success
      res.status(201).json({
        success: true,
        message: "User created successfully.",
        data: { user: newUser },
      });
    } catch (error: any) {
      // Error response
      const statusCode = error.message === "Email already exists" || error.message === "Username already exists" ? 409 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message || "Error creating user.",
      });
    }
  };



// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user: UserTypes | undefined = await knex("users").where({ email }).first();

        if (!user) {
            res.status(400).json({ message: "User not found" });
            return; 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid password" });
            return; 
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET || "default_access_secret", { expiresIn: "30d" });

        // set as only cookie
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })
        res.status(200).json({ message: "Login successful", user: { ...user, password: undefined } });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error during login", error });
    }
};


// Logout user
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });
  
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error); // Pass error to Express error handler
    }
  };

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as UserTypes;
    res.status(200).json({ user });
}


export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as UserTypes;
    const { username, email, profile_pic } = req.body;

    try {
        const updatedUser = await knex("users")
            .where({ id: user.id })
            .update({ username, email, profile_pic })
            .returning(["id", "role_id", "username", "email", "profile_pic", "created_at"]);

        res.status(200).json({ user: updatedUser[0] });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Error updating user profile", error });
    }
};

