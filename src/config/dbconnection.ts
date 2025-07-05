import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const db_Url = process.env.MONGODB_URL as string;

if(!db_Url) {
    console.error("MONGODBURL is not defined in your .env file");
    process.exit(1);
}

mongoose.connect(db_Url)
.then(()=>console.log("DB connected"))
.catch((err)=>console.error("Something wrong DB is not connecting , error is : ",err))