import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/Dashboard.css';
const API_BASE_URL = "https://yoga-backend-m6ew.onrender.com"; 

const Dashboard = () => {
  const [asanas, setAsanas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsanas = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/yoga/get-all`); 
        console.log("Fetched Asanas:", response.data); 
        if (Array.isArray(response.data)) {
          setAsanas(response.data);
        } else {
          console.error("API did not return an array:", response.data);
          setAsanas([]); 
        }
      } catch (error) {
        console.error("Error fetching asanas:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAsanas();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!asanas.length) return <div>No asanas found.</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">YoGaSaNaS </h2>
      <div className="row">
        {asanas.map((asana) => (
          <div key={asana.id} className="col-md-4">
            <Link to={`/yoga/${asana._id}`} className="text-decoration-none">
              <div className="card mb-3">
                <img
                  src={asana.image || "default-image.jpg"}
                  alt={asana.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{asana.name}</h5>
                  <p><strong>Difficulty:</strong> {asana.avg_rating ?? "Not Rated"}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


