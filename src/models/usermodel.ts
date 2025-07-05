import { model , Schema } from "mongoose";
import chatSchema from "./chatmodel";

const userSchema = new Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    chats : [chatSchema],
});

const userModel = model('users',userSchema);

export default userModel;
