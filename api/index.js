import express, { application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import AuthRoute from './routes/Auth.route.js';
import UserRoute from './routes/User.route.js';


dotenv.config();
const PORT = process.env.PORT 

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// route setup
app.use('/api/auth', AuthRoute);
app.use('/api/user', UserRoute);
// test api

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);

app.use((err,req,res,next) => {
  const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
    success: false,
    statusCode,
    message, });
});