
import React ,{useState}from 'react'
import axios from 'axios'

export default function Create({onTaskAdded}) {
const [tittle,setTittle] =useState("")
const [description,setDescription] =useState("")
const [startTime,setstartTime] =useState("")
const [endTime,setEndTime] =useState("");

const handlesumbit = async (e)=>{
  e.preventDefault() //stop browser loading
  const token = localStorage.getItem("token")
  try{
  const res = await axios.post('http://localhost:5000/api/task/create',{tittle,description,startTime,endTime},
   {
    headers:{
        Authorization:`Bearer ${token}`
    }
   }
  );
  alert("Task was created successfuly")
  
    onTaskAdded(res.data);
  
    setTittle("")
    setDescription("")
    setstartTime("")
    setEndTime("")

  } catch(error) {
    console.log(error)
    alert("Error in create task")
    
  }
}
// console.log("onTaskAdded prop:", onTaskAdded);
return (
    <form
    onSubmit={handlesumbit} className='bg-white p-4 rounded-lg shadow-md space-y-3'>
       <input type='text' value={tittle} placeholder='Enter your tittle'onChange={(e)=>setTittle(e.target.value)} className='w-full hover:border-blue-600 p-2 border rounded'required></input>
        <textarea placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full p-2 border hover:border-blue-600 rounded'  />
       <input type='text' value={startTime} placeholder='YYYY-MM-DDTHH:mm'onChange={(e)=>setstartTime(e.target.value)} className='w-full hover:border-blue-600 p-2 border rounded'required></input>
       <input type='text' value={endTime} placeholder='YYYY-MM-DDTHH:mm'onChange={(e)=>setEndTime(e.target.value)} className='w-full p-2 border hover:border-blue-600 rounded'required></input>
       <button type='sumbit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' >Sumbit</button>
    </form>
    
  )
}

