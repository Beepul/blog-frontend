import { useState } from "react"
import "./register.css"
import axios from "axios";

export default function Register() {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState({
    isError: false,
    errorMsg: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({
      isError: false,
      errorMsg: null
    })
    try {
      const res = await axios.post('https://blog-api-o6f8.onrender.com/api/auth/register',{
        username,
        email,
        password
      })
      res.data.user && window.location.replace("/login");
      
    } catch (error) {
      console.log("error",error)
      setError({
        isError: true,
        errorMsg: error.response.data.message
      })
    }
  }
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" onChange={e=>setUsername(e.target.value)} type="text" placeholder="Enter your username..." />
        <label>Email</label>
        <input className="registerInput" onChange={e=>setEmail(e.target.value)} type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="registerInput" onChange={e=>setPassword(e.target.value)} type="password" placeholder="Enter your password..." />
        <button className="registerButton" type="submit">Register</button>
      </form>
        <button className="registerLoginButton">Login</button>
        {error && (
          <span style={{color: "red", marginTop: "20px"}}>{error.errorMsg}</span>
        )}
    </div>
    )
}
