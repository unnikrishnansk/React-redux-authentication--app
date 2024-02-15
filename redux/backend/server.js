import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './Routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users',userRoutes);

const PORT = process.env.PORT || 5000;

app.get('/',(req,res) =>{
    res.send("server is ready");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`listening to the port ${PORT}`);
})