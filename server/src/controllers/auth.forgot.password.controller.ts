import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import knex from "../db/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";




require('dotenv').config(); 



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "tobiasbarakan@gmail.com",
    pass: process.env.PASSWORD_NODEMAILER 
  }
});


export const sendPasswordLink = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
  
    if (!email) {
      res.status(400).json({ message: "Email is required" })
      return
    }
  
    try {
      
      const user = await knex('users').where({ email }).first();
  
      if (!user) {
        res.status(404).json({ message: "User not found" })
        return;
      }
  
      const accessSecret = process.env.ACCESS_SECRET;
      if (!accessSecret) {
        throw new Error("ACCESS_SECRET is not defined in environment variables");
      }
      const verifyToken = jwt.sign({ id: user.id, email: user.email }, accessSecret, { expiresIn: '120s' });
  
      await knex('email_verification_tokens').insert({
        user_id: user.id,
        verifyToken: verifyToken,
        expires_at: knex.raw("now() + interval '120 seconds'") 
      });
  
      const mailOptions = {
        from: 'tobiasbarakan@gmail.com',
        to: email,
        subject: "Sending Email for Password Reset",
        text: `This is your password reset link, valid for 2 minutes: http://localhost:5173/forgot-password/${user.id}/${verifyToken}`
      };
  
     
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: "Error in sending password reset link", status: 500 });
        } else {
          return res.status(201).json({ message: "Password reset link sent to your email", status: 201 });
        }
      });
    } catch (error) {
      console.error("Error during email verification:", error);
      res.status(500).json({ message: "An error occurred during the email verification process", status: 500 });
    }
  };
 
  

  export const passwordForgot = async (req: Request, res: Response): Promise<void> => {
    const { id, token } = req.params;
  
    try {
      console.log('ID:', id, 'Token:', token); 
  
      const validUser = await knex('email_verification_tokens').where({ user_id: id, verifyToken: token }).first();
      console.log('Valid User:', validUser); 
  
      if (!validUser) {
        res.status(404).json({ message: 'User or token not found' })
        return;
      }
  
      const accessSecret = process.env.ACCESS_SECRET;
      if (!accessSecret) {
        throw new Error("ACCESS_SECRET is not defined in environment variables");
      }
      const verifyToken = jwt.verify(token, accessSecret);
      console.log('Verified Token:', verifyToken); 
  
      if (validUser && verifyToken) {
        res.status(200).json({ validUser, status:200 })
        return;
      }
    } catch (error) {
      res.status(401).json({ message: 'Token Expired try to login again', status: 401 })
      return;
    }
  };


  export const changePassword = async (req: Request, res: Response): Promise<void> => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    
    console.log(newPassword, confirmPassword, 'Received values in backend');
    
    if(newPassword !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" })
      return;
    }
  
    try {
      const validUser = await knex('email_verification_tokens').where({ user_id: id, verifyToken: token }).first();
  
      if (!validUser) {
        res.status(404).json({ message: 'User or token not found' })
        return;
      }
  
      const accessSecret = process.env.ACCESS_SECRET;
      if (!accessSecret) {
        throw new Error("ACCESS_SECRET is not defined in environment variables");
      }
      const verifyToken = jwt.verify(token, accessSecret);
  
      if (validUser && verifyToken) {

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // const hashedPassword = await hashPassword(newPassword);
  
        await knex('users').where({ id }).update({ password: hashedPassword });
        res.status(201).json({ message: 'Password updated successfully', status: 201 })
        return;
      }
    } catch (error) {
      res.status(401).json({ message: 'Token Expired. Try to log in again.' })
      return;
    }
  }



