import express from "express";

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Done server is running");
});

app.listen(5000,()=>console.log("Server is running at 5000 port"))