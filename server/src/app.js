import cors from 'cors';
import express from 'express';

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to enable CORS
app.use(cors({
    origin : process.env.corsOrigin,
    credentials: true,
}));

export default app;