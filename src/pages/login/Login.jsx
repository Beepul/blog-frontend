import { useContext, useRef } from "react";
import "./login.css";
import { Context } from "../../Context/Context";
import axios from "axios";

export default function Login() {

  const emailRef = useRef();
  const passRef = useRef();
  const {dispatch,isFetching} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
      const res = await axios.post('https://blog-api-o6f8.onrender.com/api/auth/login',{
        email: emailRef.current.value,
        password: passRef.current.value
      })
      dispatch({type: "LOGIN_SUCCESS", payload: res.data.user})
    } catch (error) {
      dispatch({type: "LOGIN_FAILURE"});
    }
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input className="loginInput" ref={emailRef} type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="loginInput" ref={passRef} type="password" placeholder="Enter your password..." />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
        <button className="loginRegisterButton">Register</button>
    </div>
  );
}
