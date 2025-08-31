import User from '../Model/User.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET



//signup logic
const signup = async (req,res)=>{
    try{
    const {name,email,password}=req.body //fotend se data feed ho rha h 
    const existinguser =await User.findOne({email}) // isme existing user  id find krra h databse me 
    if(existinguser) return res.status(400).json({message:"user already exists"}) // agr user id mill jaati h to usko error ddikha do ki id already exist krti h 
     
     
     //hash password 
        
    const hashpassword=await bcrypt.hash(password,10); 
    

    //create new user
    const user = await User.create({name,email,password:hashpassword}) //agr nhi milti to ek new id create krdo
    await user.save(); //save in  databse 
    res.status(201).json({message:"user created succuessfully",user}) 
        
    } catch(error){
        console.log(error.message)
    res.status(500).json({message:"internal server error",error})
    }
    
    

}




// Login logic 
const login = async(req,res)=>{
    try{
  


        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) return res.status(404).json({message:"user no find"})
        
        //compare password
        const isMatching = await bcrypt.compare(password,user.password)
        
        if(!isMatching) return res.status(400).json({message:"invalid creadentials"})

        //generate token
        const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:"7d"});
        res.status(200).json({token})
        
        

    } catch(error){
        console.log("login error",error.message)
        res.status(500).json({message:"internal server error",error})
    }
}

//logout

const logout = (req,res)=>{
    res.status(200).json({message:"logout successfuly "})
}

export {signup,login,logout};