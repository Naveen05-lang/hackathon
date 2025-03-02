import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/UserProfile.css';
function UserProfile() {
  const API_BASE_URL = "https://yoga-backend-m6ew.onrender.com";
  const [user, setUser] = useState(null);
  let userId = localStorage.getItem("user");
  userId = userId.replace(/^"|"$/g, "");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/yoga/logs/${userId}`);
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <h2>Yoga Logs</h2>
          <ul>
            {user.logs.map((log) => (
              <li key={log.asanaId} style={{ marginBottom: "20px" }}>
                <p><strong>Asana Name:</strong> {log.asanaName}</p>
                <img src={log.image} alt={log.asanaName} style={{ width: "150px", borderRadius: "10px" }} />
                <p><strong>Count : </strong>{log.count}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default UserProfile;