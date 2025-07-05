import dotenv from 'dotenv';
dotenv.config();
const cookie_secret = process.env.COOKIE_SECRET;

import express from 'express';
import appRouter from "./routes";
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser(cookie_secret));
app.use('/api/v1',appRouter);

app.get('/',(req,res)=>{
    res.send("Done server is running");
});

export default app;