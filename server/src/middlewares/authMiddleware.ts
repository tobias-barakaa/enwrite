import  jwt  from 'jsonwebtoken';
import { NextFunction, Request, Response  } from 'express';
import knex from '../db/db';



export const protectUser = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
  let token = req.cookies.jwt;
  console.log(token ,'tokennesisn')

  if (token) {
    try {
      if (!process.env.ACCESS_SECRET) {
        throw new Error('ACCESS_SECRET is not defined');
      }

      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET) as jwt.JwtPayload;

      // Fetch user data without password
      const user = await knex('users')
        .select('id', 'username', 'email')
        .where({ id: decoded.userId })
        .first();

      if (!user) {
        res.status(401).json({ message: 'Unauthorized: User not found' });
        return;
      }

      // Attach the user object to the request object
      req.user = user;

      // Call the next middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
      return;
    }
  } else {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};


// const admin = (req: Request, res: Response, next: NextFunction) => {
//     if(req.user && req.user.isAdmin) {
//         next();
//     } else {
//         res.status(401);
//         throw new Error('Not authorized as an admin');
//     }
// }