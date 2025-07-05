import { Request , Response , NextFunction } from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/usermodel"

import dotenv from 'dotenv';
dotenv.config();
const jwt_secret = process.env.JWT_SECRET as string;

const getAllUsers = async (req : Request , res : Response , next : NextFunction ) =>{
    try{
        const users = await userModel.find();
        res.status(200).json({message : "Ok" , users});
    }catch(err : any){
        console.error("error is : " , err.message);
        res.status(501).send("Some thing is wrong");

    }
}

const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  try {
    const findUser = await userModel.findOne({ email });

    if (findUser) {
    res.status(409).send("User already exists"); // 409 = Conflict
    }

    const hashed_password = await bcrypt.hash(password,10);

    await userModel.create({ name, email, password : hashed_password });
    const user_detail = await userModel.findOne({email});
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    if(user_detail){
      const token = jwt.sign({
            id : user_detail._id
          },jwt_secret , { expiresIn: "7d" });
      res.status(201).cookie("auth_token",token,{path : '/',expires : expires , httpOnly : true , signed : true }).json({
              message: "You are logged in",
            });
    }
    

  } catch (err: any) {
    console.error("Error is:", err.message);
    res.status(500).send("Something went wrong");
  }
};

const userLogin = async (req : Request , res : Response , next : NextFunction)=>{
    const { email , password } = req.body;
    try{
      const checking_user = await userModel.findOne({email});
      if(checking_user){
        const hashed_password = await bcrypt.compare(password,checking_user.password);
        if(hashed_password){
          const token = jwt.sign({
            id : checking_user._id
          },jwt_secret , { expiresIn: "7d" });

          const expires = new Date();
          expires.setDate(expires.getDate()+7);

          res.clearCookie("auth_token",{path : '/',domain : "www.talkmind.netlify.app",expires : expires , httpOnly : true , signed : true });
          if(token){
            res.status(200).cookie("auth_token",token,{path : '/',expires : expires , httpOnly : true , signed : true }).json({
              message: "You are logged in",
            });
          }else{
            res.send("Some wrong so logging again");
          }
        }else{
          res.send("Password is wrong");
        }
      }else{
        res.send("Invalid email or password");
      }
    }catch{
      res.send("Something wrong logging again");
    }
}


export { getAllUsers , userSignup , userLogin};