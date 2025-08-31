import express from 'express';
import {signup,login, logout} from '../Controller/User.controller.js';
import {authenticateUser} from '../middleware/user.middlware.js'


const router =express.Router();


router.post("/signup",signup)


router.post("/login",login)

router.post("/logout",authenticateUser,logout)



router.get("/profile",authenticateUser,(req,res)=>{
    res.status(200).json({message:"verified profile",UserId:req.user.id})
})
export default router;