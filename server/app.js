import cors from 'cors';
import express from 'express';
import { serve } from "inngest/express";
import { inngest, functions } from "./src/inngest/index.js";
import { clerkMiddleware } from '@clerk/express'


const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to enable CORS
app.use(cors({
    origin : process.env.corsOrigin,
    credentials: true,
}));
app.use("/api/inngest", serve({ client: inngest, functions }));

app.use(clerkMiddleware())

// The clerkMiddleware() function checks the request's cookies and headers for a session JWT and, if found, attaches the Auth object to the request object under the auth key.


export default app;