const Usermans =require("../models/users");
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");
require('dotenv').config();
 

//register post
register=async(req,res,next)=>{  
    try{
        var salt=bcrypt.genSaltSync(10);
        var hash=bcrypt.hashSync(req.body.password,salt)

const newuser=await new Usermans({...req.body,password:hash})
await newuser.save()
res.status(200).send("user has been created")
    }
    catch(err){
        next(err)
    }
};


//login post 

login=async(req,res,next)=>{ 
try{
    let payload=req.body;
    const user=await Usermans.findOne({email:payload.email})
   
        if(!user)
        {
            return next(createError(404,"user with that mail does not exist"));
        }
        const validUser=await bcrypt.compare(payload.password,user.password);
        if(validUser)
        {
            const token = jwt.sign({_id:user._id},process.env.SECURE);
            const {password,...others}=user;
            return res.cookie("t",token,{httpOnly:true,expire:new Date(Date.now() +99999999999)}).status(200).json({token,others});
           // console.log(token,others)
        }
        else{ 
            return next(err)
        }
    } 

catch(err){  
    return res.status(400).json({
        err:"user with that mail does not exist"
    });
}

}



    



module.exports={register,login}