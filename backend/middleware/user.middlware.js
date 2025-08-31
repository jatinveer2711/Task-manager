import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;
export const authenticateUser =(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]; 
    if(!token) return res.status(401).json({message:"unathorized user or token not provide"})

try{
    const decoded = jwt.verify(token,JWT_SECRET);
    req.user=decoded
    next();
} catch(error){
     return res.status(401).json({message:"invalid token"})
}
}