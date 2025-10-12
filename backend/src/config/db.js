import mongoose from "mongoose";
import {ENV} from "./env.js";

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(ENV.MONGO_URL);
        console.log("Connected to mongoDB:", conn.connection.host);

    } catch (error) {
        console.log("Error while connecting to mongoDB", error);
        process.exit(1);    
    }
}