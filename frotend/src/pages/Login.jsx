import React ,{useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function login() {
  const navigate = useNavigate();
  const [fromdata,setFormdata] = useState({
    email:"",
    password:""
  })
  const[error,setError]=useState("")
  const handlechange=(e)=>{
    setFormdata(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  const handlesumbit=async(e)=>{
    e.preventDefault(); //stop the default loading of browser
    setError("") // clear previos error

    try{
      const res = await axios.post("http://localhost:5000/api/user/login",fromdata);
      const token = res.data.token // token le rhe h backend se
      localStorage.setItem("token",token); // store the token in local storage
      navigate("/"); // redirect to home page after login
    }
  catch(error){
    setError(error.response?.data?.message || "login failed");
  }
};
  return (
  <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen flex items-center justify-center px-4">
  <form
    onSubmit={handlesumbit}
    className="bg-gray-950/70 backdrop-blur-lg border border-gray-700 shadow-xl p-8 rounded-2xl w-full max-w-md"
  >
    <h2 className="text-3xl text-white font-bold mb-6 text-center tracking-wide">
      Login
    </h2>

    {error && (
      <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
    )}

    <div className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={fromdata.email}
        onChange={handlechange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={fromdata.password}
        onChange={handlechange}
        required
      />
    </div>

    <button
      type="submit"
      className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
    >
      Login
    </button>

    <p className="text-gray-400 text-center mt-4">
      Don’t have an account?{" "}
      <a
        href="/signup"
        className="text-blue-400 hover:text-blue-300 underline font-medium"
      >
        Sign Up
      </a>
    </p>
  </form>
</div>

  )
}
