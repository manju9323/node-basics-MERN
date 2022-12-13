const express=require("express");
const user=require("./routes/users");
const {connect}=require("./dbconnect");
const cors=require("cors")
 require('dotenv').config();

const app=express()
app.use(cors())
app.use(express.json());  //json
app.use(express.urlencoded({extended:true})); //json 

//app.use("/api/auth",test)
app.use("/api/users",user) 
//app.use("/api/videos",videos) 
//app.use("/api/comments",comments) 

/*app.use((err,req,res,next)=>{
    const status=err.status || 500;
    const message=err.message || "something went wrong";
    res.status(status).json({sucess:false,status,message})
})  */

//app.get('/api',(req,res)=>{res.send("welcome")})
   

app.listen(8000,()=>{ 
    connect()
  console.log("local server connected")
})    