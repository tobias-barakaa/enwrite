import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err.stack);
    
    res.status(500).json({
      errors: [{
        field: 'general',
        message: process.env.NODE_ENV === 'development' 
          ? err.message 
          : 'An unexpected error occurred'
      }]
    });
  };