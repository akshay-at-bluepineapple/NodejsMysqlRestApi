const {verify} = require("jsonwebtoken");

module.exports={
    checktoken:(req,res,next)=>{
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);//as token has bearer which is of 6 letters and 1 for space after slicing will  ruturn authorization token 
            verify(token,"gdsdjgajh",(error,decoded)=>{
                if(error){
                    res.json({
                        success:0,
                        message:"invalid token"
                    })
                }else{
                    next();
                }
            })
        }else{
            res.json({
                sucess:0,
                message:"access denied"
            });
        }

    }
}