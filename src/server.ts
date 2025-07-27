import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { connectDB } from './db';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

connectDB(); 

import authRoutes from "./routes/authRoutes"
import uploadRoutes from "./routes/uploadRoutes"

app.use('/uploads', express.static('uploads'));


app.use('/user',authRoutes)
app.use('/file',uploadRoutes );

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
