require('dotenv').config()
import mongoose from "mongoose"

const mongoUrl=process.env.MONGO_DB_URL as string;

const connectToDatabase=async ()=>{
    try {
        await mongoose.connect(mongoUrl);
        console.log("Connected to DB")  
    } catch (error) {
        console.error("Failed to connect to the DB",error);
    }
}

export default connectToDatabase;