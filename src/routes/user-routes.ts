import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user-controllers";

const userRoutes = Router();

userRoutes.get('/',getAllUsers);
userRoutes.post('/signup',userSignup);
userRoutes.post('/login',userLogin);

export default userRoutes;