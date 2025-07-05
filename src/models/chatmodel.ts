import mongoose , { model , Schema} from "mongoose";

const chatSchema = new Schema({
    role : { type : String, required : true },
    content : { type : String , required : true },
})

export default chatSchema;