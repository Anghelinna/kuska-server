import 'dotenv/config';
import './shared/types'; // Importar tipos extendidos de Express
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import type { Request, Response } from 'express';
import authRoutes from './auth/infrastructure/routes/authRoutes';
import { errorHandler } from './shared/infrastructure/middlewares/errorHandler';

const app = express();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Kuska Server API is running',
    version: '1.0.0',
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;