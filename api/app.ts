// app.ts
import express, { type ErrorRequestHandler } from 'express';
import authRoutes from './routes/auth.routes';
import swaggerRouter from './swagger'; // <-- import
import cors from 'cors';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// Mount routes
app.use('/auth', authRoutes);
// app.get('/docs', (_req, res) => {
//   res.redirect('/api-docs');
// });
// app.get('/docs/api-docs', (_req, res) => {
//   res.redirect('/api-docs');
// });
app.use('/api-docs', swaggerRouter);

// Error handler
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
};
app.use(errorHandler);

export default app;