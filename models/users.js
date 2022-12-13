const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
     },
     email:{ 
        type:String,
       unique:true,
       required:true,
     },
    password:{ 
        type:String,
        required:true, 
    },
},
{timestamps:true});
 


module.exports=mongoose.model("Usermans",userschema) 