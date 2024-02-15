import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected MongoDB ${connect.connection.host}`);
    }
    catch(err){
        console.err(`Error connecting MongoDB ${err.message}`)
        process.exit(1);
    }
}

export default connectDB;