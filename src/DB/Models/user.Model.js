import mongoose from "mongoose";

const { model, Schema } = mongoose;


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        minlength:18,
        maxlength:60
    }
},{
    strict:true
})

export const UserModel = mongoose.model("User",userSchema)