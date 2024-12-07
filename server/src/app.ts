// app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import userRoutes from './routes/auth.route';
import orderRoutes from './routes/order.route';
import adminRoute from './routes/admin/auth.admin.route';
import orderRoute from './routes/admin/order.admin.route';
import forgotRoute from './routes/auth.forgot.password.route';


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev')); 
app.use(compression());
app.use(cookieParser());

const allowedOrigins = [
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) {
      if (process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(new Error('CORS policy disallows this request'));
      }
    } else if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Default Route
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use("/api", userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/admin', adminRoute);
app.use('/api/admin/order', orderRoute);
app.use('/api/v4/forgot-password', forgotRoute);


export default app;
