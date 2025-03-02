import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      
      <h1 className={styles.title}>Welcome to YoGaSaNa Wellness</h1>
      <p className={styles.subtitle}>
        Track your Yogasanas, compete with friends, and improve your health!
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.signUp} onClick={() =>navigate("/signup")}>
          Sign Up
        </button>
        <button className={styles.login} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;

