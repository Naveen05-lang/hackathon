import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";
// import '../styles/SignUp.css';
import axios from 'axios';
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  
     const response =await axios.post('https://yoga-backend-m6ew.onrender.com/auth/register',formData);
    console.log("User Signed Up:", formData);
    navigate("/"); 
  };

  return (
    <div className={styles.container}>
      <h2 className="sign">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <span onClick={() => navigate("/login")} className={styles.link}>Login</span></p>
    </div>
  );
};

export default SignUp;