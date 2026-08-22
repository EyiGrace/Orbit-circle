import { Pool } from 'pg';
import 'dotenv/config';

// Pass the unified Neon connection string directly into the Pool constructor.
// This automatically handles the host, port, user, password, and database parameters.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Call this once at startup to fail fast if the DB is unreachable
export const connectDB = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1'); // cheap check to verify connection works
    client.release(); // return the connection to the pool
    console.log('Database connected successfully via Neon');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // fail fast if the API cannot reach the DB
  }
};
