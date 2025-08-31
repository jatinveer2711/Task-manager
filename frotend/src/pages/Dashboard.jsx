import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";
import Logout from "./Logout";
import {format} from 'date-fns'
// import {} from '@lambdatauri/lucid'
import { Pencil, Trash, Trash2,Search, X, XCircle, XOctagon } from "lucide-react";




export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showform,setShowform]=useState(false)
  const [searchquery,setSearchquery] = useState("")
  const [status,setStatus] = useState("")
  const [sort,setSort] = useState("desc")




  //fetch task

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get("http://localhost:5000/api/task/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        //withCredentials: true, // agar future me cookies handle karni ho
      });
      console.log("DEBUG: /api/task response ->", res.data);
      if(Array.isArray(res.data)){
    setTasks(res.data)
  }
  else if (Array.isArray(res.data.tasks)){
    setTasks(res.data.tasks)
  }
  else{
    setTasks([])
  } 
}catch(error){
    console.log("Error in fetching",error)
    setTasks([])
  } finally{
    setLoading(false)
  }
}

  
  useEffect(() => {
    fetchTasks();
  }, []);
  

  //create task
  const handleAddtask=()=>{
    fetchTasks()
  }

//  sorting and filter  (ascending and descending order)
  
      useEffect(()=>{
    const FetchfilteredTasks = async()=>{
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get('http://localhost:5000/api/task/filter',{
        params:{
          status,sort
        },
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      setTasks(Array.isArray(res.data)?res.data:[])
    } catch (error) {
      console.error("Error fetching filtered tasks",error);}
  };
  FetchfilteredTasks()
  },[status,sort])


  //Delete task 

  const handleDelete=async(taskId)=>{
    try{
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:5000/api/task/delete/${taskId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setTasks(prevTasks=>prevTasks.filter(task=>task._id!==taskId));
      alert("Task was deleted succussfuly")
      
    } catch(error){
      console.error("Error in task deleting")
      alert(" Error task not deleted")

    }
  } 


  //  Update task 

  const updateTask = async(taskId,currentTittle,currentDescription)=>{
    const token = localStorage.getItem("token")
    const newTittle = prompt ("Enter your current tittle",currentTittle)
    const newDescription = prompt ("Enter your current tittle",currentDescription)
    if(!newTittle || !newDescription) return;
    try {
      const res = await axios.put(`http://localhost:5000/api/task/update/${taskId}`,
        {
          tittle:newTittle,
          description:newDescription
          
        },
        {
        headers:{
          Authorization:`Bearer ${token}`
        }
    });
    setTasks((prevTasks)=>
      prevTasks.map((task)=>
      task._id===taskId ? res.data : task) // taskk._id vhi taskID h jo api bakend me call ho rhi to usko update(res.data backend me api jaa rhi h ) krdo vrna vhi task rhne ddo
  )
  alert("Task was created succussfully")
    } catch (error) {
      console.error("Error in task update")
      alert("Task update Error")
      
    }

  }
 //task completed or pending
  const toggleStatus = async(taskId,currentStatus)=>{
    try {
      const token = localStorage.getItem("token") 
      const newStatus=currentStatus === "Completed"? "pending":"Completed" // newstatus me daal rhe h ki agr complete h to pending krdo vrna comlplete rhe
      const res = await axios.put(`http://localhost:5000/api/task/update/${taskId}`,{  // backend ko call krdo ki iss userid ka status update krdo
        status:newStatus},{ // backend kko bejh rhe h status means completed yaa pending
          headers:{
            Authorization:`Bearer ${token}`
      }
      })
      setTasks((prevTasks)=> // ye frotend me show krti h 
      prevTasks.map((task)=> // hrr ek task ko acccess krra h 
      task._id===taskId ? {...task,status:newStatus}:task)) //agr task id h to status update krdo ...task means task ka purana data rhne do 
      
    } catch (error) {
      console.error("Error in updating ",error)
      
    }
  }


  // search tasks

const searchTasks = async()=>{
  try {
    const token = localStorage.getItem("token")
    const res = await axios.get('http://localhost:5000/api/task/search',{
      params:{ q: searchquery}, //send the query to the backend
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    setTasks(res.data)
  } catch (error) {
    console.error("error in fetching tasks",error)
  }
}
useEffect(()=>{
  searchTasks()
},[searchquery])

// //notification task related

useEffect(()=>{ if("Notification" in window && Notification.permission !=="granted"){ Notification.requestPermission() } },[]) //ye bss teen option check krega agr popup aayw to iska matlab permission me default h agr nhi aaya to matlab denied ho skta h yaa allow





//notification before task was ended
useEffect(()=>{
  const CheckNotfication  = async()=>{
  const now = new Date();
  tasks.forEach((task)=>{
    const endTime = new Date(task.endTime)
    const diff = endTime - now;
    if(diff > 0 && diff < 5*60*1000) {
    if("Notification" in window && Notification.permission ==="granted"){
      new Notification("Task reminder",{
        body:`${task.tittle} is about to end`
      })
    }
    }
  })
  }
  if(tasks.length > 0 ) {
    const interval = setInterval(CheckNotfication,60000)
    return ()=> clearInterval(interval)
  }
},[tasks])


    
 

    

      
    return (
      
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6">
  {/* Top Section */}
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
      📋 Dashboard
    </h1>
    <div className="px-6 mb-6">
  <div className="relative max-w-xl mx-auto">
    {/* Search Icon */}
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    

    {/* Input Field */}
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchquery}
      onChange={(e) => setSearchquery(e.target.value)}
      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300 shadow-sm"
    />
  </div>
</div>
</div>
{/* Create Task Button */}
  <div className="mb-6 flex justify-start">
    <button
      onClick={() => setShowform(!showform)}
      className={`px-5 py-2.5 rounded-lg font-medium shadow-lg transition-all duration-300 ${
        showform
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {showform ? "Close Form ✖" : "➕ Create Task"}
    </button>
  </div>

{/* filter status nad sort */}
<div className="flex flex-col sm:flex-row gap-4 mb-6">
  
  {/* Status Filter */}
  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-300 
               bg-white text-gray-700 text-sm shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 
               transition duration-200"
  >
    <option value="">All Status</option>
    <option value="pending">⏳ Pending</option>
    {/* <option value="in-progress">🚀 In Progress</option> */}
    <option value="Completed">✅ Completed</option>
  </select>

  {/* Sort Filter */}
  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-300 
               bg-white text-gray-700 text-sm shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 
               transition duration-200"
  >
    <option value="desc">🆕 Newest First</option>
    <option value="asc">📅 Oldest First</option>
  </select>
</div>


{/* Create Task Form */}
  {showform && (
    <div className="mb-8 bg-white rounded-xl shadow-md border border-gray-200 p-6 animate-fadeIn">
      <Create onTaskAdded={handleAddtask} />
    </div>
  )}

  {/* Tasks Section */}
  {loading ? (
    <p className="text-gray-300 italic text-lg">Loading tasks...</p>
  ) : tasks.length === 0 ? (
    <p className="text-gray-400 text-lg italic">
      No tasks found. Start adding some!
    </p>
  ) : (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          {/* Title */}
          <h3 className="text-xl  font-semibold text-gray-800 truncate">
            {task.tittle || task.title}
          </h3>

          {/* date */}
          <span className="text-gray-500 text-sm">
              {task.createdAt ? format(new Date(task.createdAt),'dd MMM yyyy,h:MM a'):"no date"}
            </span>

          {/* Description */}
          <p className="text-gray-600 mt-3 line-clamp-3">
            {task.description || "No description provided."}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4">
            {/* Edit Button */}
            <button
              onClick={() =>
                updateTask(task._id, task.tittle, task.description)
              }
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Pencil size={18} /> Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(task._id)}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
        {/* <div className="flex gap-4 mb-4"> */}
  
  

          {/* Status Button */}
          <div className="mt-5">
            <button
              onClick={() => toggleStatus(task._id, task.status)}
              className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm transition-colors ${
                task.status === "Completed"
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              }`}
            >
              {task.status === "Completed" ? "✅ Completed" : "⏳ Pending"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
  <Logout />


 


</div>


    )
};
  
