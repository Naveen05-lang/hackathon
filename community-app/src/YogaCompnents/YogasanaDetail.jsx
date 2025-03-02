import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import  "../styles/Yogasana.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
const API_BASE_URL = "https://yoga-backend-m6ew.onrender.com";

const YogasanaDetail = () => {
  const { id } = useParams();
  console.log("Extracted ID:", id);
  let navigate=useNavigate();
  const [asana, setAsana] = useState(null);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [difficulty, setDifficulty] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("Error: No ID found in URL");
      return;
    }

    const fetchAsana = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/yoga/${id}`);
        console.log(response.data);

        setAsana(response.data);
        setLikes(response.data.likes ?? 0);
        setDifficulty(response.data.rating ?? null);
      } catch (error) {
        console.error("Error fetching asana:", error);
      }
    };

    fetchAsana();
  }, [id]);

  const updateLike = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/yoga/${id}/like`);
      setLikes((prevLikes) => prevLikes + 1); 
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const updateDifficulty = async (rating) => {
    let userid = localStorage.getItem("user");
    try {
      userid = userid.replace(/^"|"$/g, "");

      const response = await axios.post(`${API_BASE_URL}/yoga/rate`, {
        userId: userid,
        asanaId: id,
        rating: rating,
      });

      setDifficulty(rating); 
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };
 

  const updateCount = async () => {

   
    let userid=localStorage.getItem("user");
    try {
      userid=userid.replace(/^"|"$/g, ""); 
      const response = {
        userId: userid,
        asanaId: id,
      };

      await axios.post(`${API_BASE_URL}/yoga/log`,response);
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error updating count:", error);
    }
console.log("Count Updated",userid);

  };


  const addComment = async () => {
    let userid = localStorage.getItem("user");
    try {
      userid = userid.replace(/^"|"$/g, "");

      if (!comment.trim()) return;

      const response = await axios.post(`${API_BASE_URL}/yoga/comment`, {
        userId: userid,
        asanaId: id,
        text: comment,
      });

      setAsana((prevAsana) => ({
        ...prevAsana,
        comments: [...prevAsana.comments, { text: comment }],
      }));

      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!asana) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{asana.name}</h2>
     

      


            {asana.video ? (
        asana.video.includes("youtube.com") || asana.video.includes("youtu.be") ? (
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
             style={{width:"100%",height:"400px"}} 
              className="embed-responsive-item w-100"
              src={asana.video.replace("watch?v=", "embed/")} 
              title="Yogasana Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <video controls className="w-100">
            <source 
              src={asana.video.startsWith("http") ? asana.video : `${API_BASE_URL}/${asana.video}`} 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
        )
      ) : (
        <p className="text-muted">No video available</p>
      )}

      <p>{asana.description}</p>
      

      <p><strong>Difficulty:</strong> {difficulty ?? "Not Rated"}</p>
      <div className="btn-group mb-3">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => updateDifficulty(num)}
            className={`btn ${difficulty === num ? "btn-primary" : "btn-outline-primary"}`}
          >
            {num}
          </button>
        ))}
      </div>

      

      <p><strong>Comments:</strong></p>
      <ul>
        {asana.comments && asana.comments.length > 0 ? (
          asana.comments.map((com, index) => <li key={index}>{com.text}</li>)
        ) : (
          <p>No comments yet</p>
        )}
      </ul>
      <button onClick={updateCount} className="btn btn-success">
        Log Another Session
      </button>
      <div className="mt-3">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="form-control"
          placeholder="Add a comment"
        ></textarea>
        <button onClick={addComment} className="btn btn-primary mt-2">Add Comment</button>

        
      </div>
    </div>
  );
};

export default YogasanaDetail;






