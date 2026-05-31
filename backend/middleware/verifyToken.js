import jwt from "jsonwebtoken";;

export const verifyToken = ()=>
{
    return (req,res,next)=>
    {
        try{
            const token=req.cookies.token;

            if(!token){
                return res.status(401).json({
                    message:"Unauthorized"
                });
            }

            const decoded=jwt.verify(token,process.env.jwt_secret);
            
            req.user=decoded;
            next();
        }
        catch(err){
            return res.status(401).json({
                message:"Invalid token"
            });
        }
    }
}