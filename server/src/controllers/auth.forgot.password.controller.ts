import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import knex from "../db/db";
import jwt from "jsonwebtoken";



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
  
      const verifyToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_SECRET, { expiresIn: '120s' });
  
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
  






export const sendPasswordLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    // Check if the user exists in the database
    const user = await knex("users").where("email", email).first();
    if (!user) {
      res.status(404).json({
        success: false,
        message: "No account associated with this email",
      });
      return;
    }

    // Generate a password reset token (valid for 1 hour)
    const token = jwt.sign(
      { id: user.id },
      process.env.RESET_PASSWORD_SECRET as string,
      { expiresIn: "1h" }
    );

    // Create reset password link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${user.name},</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email address",
    });
  } catch (error) {
    console.error("Error sending password reset link:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while sending the password reset link",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
