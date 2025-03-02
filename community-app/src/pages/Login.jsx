import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    let res=await axios.post('https://yoga-backend-m6ew.onrender.com/auth/login',formData);

   

    if(res.status === 200){
      console.log("User Logged In:", res);
       localStorage.setItem("user", JSON.stringify(res.data.user._id)); 
    navigate("/post-login-home");
    }
    else{
      console.log("User not Logged In:",message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className="sign">Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <span onClick={() => navigate("/signup")} className={styles.link}>Sign Up</span></p>
    </div>
  );
};

export default Login;
