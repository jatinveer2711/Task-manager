import React  from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function signup() {
    const navigate = useNavigate();
    const [formdata,setFormdata] = useState({
        name:"",
        email:"",
        password:""

    })
     
    //handlechange function

    const [error,setError]=useState()
    const handlechange=(e)=>{ 
        setFormdata(prev=>({
            ...prev,  
            [e.target.name] : e.target.value 
        }))
    };
    


    //haldesumbit function

    const handlesumbit=async(e)=>{
       e.preventDefault(); //browser ko load hone se rokta h kyu ki browser ka load hona defualt h 
       setError("") //pehle koi error dikh rha ho to usse hta do
    try {
      await axios.post("http://localhost:5000/api/user/signup", formdata);//iss api prr formdata ka data bejh do bejh do
      navigate("/login"); // redirect to login after signup
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed"); //agr koi backend me error aata h to usko err.response me show krr dega vrna frotend ke liye signup failed
    }
  };


  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen flex items-center justify-center px-4">
  <form
    onSubmit={handlesumbit}
    className="bg-gray-950/70 backdrop-blur-lg border border-gray-700 shadow-xl p-8 rounded-2xl w-full max-w-md"
  >
    <h2 className="text-3xl text-white font-bold mb-6 text-center tracking-wide">
      Sign Up
    </h2>

    {error && (
      <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
    )}

    <div className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={formdata.name}
        onChange={handlechange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={formdata.email}
        onChange={handlechange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={formdata.password}
        onChange={handlechange}
        required
      />
    </div>

    <button
      type="submit"
      className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
    >
      Sign Up
    </button>

    <p className="text-gray-400 text-center mt-4">
      Already have an account?{" "}
      <a
        href="/login"
        className="text-blue-400 hover:text-blue-300 underline font-medium"
      >
        Log in
      </a>
    </p>
  </form>
</div>

  )
}

