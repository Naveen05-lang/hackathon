import React from "react";
import '../styles/About.css'; 

function About() {
    return (
        <div className="about-container">
            <h1 className="about-title">About Us</h1>
            <p className="about-text">
                <strong>YoGaSaNa Wellness</strong> is your go-to platform for tracking Yogasanas, 
                competing with friends, and enhancing your physical and mental well-being.
            </p>
            <p className="about-text">
                Our mission is to make yoga more engaging and interactive. Whether you're a beginner or 
                an advanced practitioner, our platform allows you to learn, practice, and rate different 
                Yogasanas based on difficulty and effectiveness.
            </p>
            <p className="about-text">
                With our <strong>community-driven approach</strong>, you can challenge friends, climb the 
                leadership board, and stay motivated on your wellness journey. We believe that yoga is not 
                just about flexibility and strength but also about mindfulness, balance, and a healthier lifestyle.
            </p>
            <p className="about-text">
                Join us in this journey of self-improvement and make wellness a part of your daily routine. 
                Start tracking your progress, explore new asanas, and take your yoga practice to the next level 
                with YoGaSaNa Wellness!
            </p>
        </div>
    );
}

export default About;
