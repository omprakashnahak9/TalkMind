import app from "./app"
import './config/dbconnection'
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;

app.listen(port,()=>console.log("Server is running at 5000 port"));