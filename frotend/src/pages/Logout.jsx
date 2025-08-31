import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LogOutIcon} from "lucide-react";


export default function Logout() {
    const navigate = useNavigate();
    const handlelogout = async()=>{
       try {
        const token = localStorage.getItem("token")
        const res = await axios.post('http://localhost:5000/api/user/logout',{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }) 
        alert("Logout successfuly")
        localStorage.removeItem("token")
        navigate('/login')
       } catch (error) {
        console.error("Logout failed",error)
       }
    }
  return (
    <div>
   <button
  onClick={handlelogout}
  className="flex items-center gap-2 
             bg-red-500 text-white font-medium 
             px-3 py-1.5 text-sm 
             sm:px-4 sm:py-2 sm:text-base 
             md:px-5 md:py-2.5 md:text-lg 
             rounded-lg shadow-md 
             hover:bg-red-600 hover:shadow-lg 
             active:scale-95 
             m-5
             transition-all duration-300"
>
  <LogOutIcon></LogOutIcon>
  
</button>
    </div>
  )
    }
