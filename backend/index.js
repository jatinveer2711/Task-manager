import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose  from 'mongoose';
import cors from 'cors' ;
import TaskRoutes from './Route/Task.route.js';
import userRoutes from './Route/user.route.js';



const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/user',userRoutes)
app.use('/api/task',TaskRoutes)





//mognoose connection 
mongoose.connect(process.env.MONGO_URI)
.then(()=>{ 
app.listen(5000,()=> console.log("server is running on port 5000"))
    console.log("MongoDB conected successfully")

})
.catch((error)=>console.log("mongo server connectiom is failed",error))
