import cors from 'cors';
import express from 'express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to enable CORS
app.use(cors({
    origin : process.env.corsOrigin,
    credentials: true,
}));
app.use("/api/inngest", serve({ client: inngest, functions }));


export default app;