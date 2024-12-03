import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (res: Response, userId: string): void => {
  const token = jwt.sign({ userId }, process.env.ACCESS_SECRET || "defaultSecret", {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};
