import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/LeadershipBoard.css"; // Import the CSS file

function LeadershipBoard() {
    const API_BASE_URL = "https://yoga-backend-m6ew.onrender.com";
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeadershipBoard = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/yoga/leaderboard`);
                console.log(response.data);
                setLeaderboard(response.data);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            }
        };
        fetchLeadershipBoard();
    }, []);

    return (
        <div className="leaderboard-container">
            <h1 className="leaderboard-title">Leadership Board</h1>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User Name</th>
                        <th>Total Asanas</th>
                        <th>Total Count</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((leader, index) => (
                        <tr key={leader.userId} className="leader-row">
                            <td>{index + 1}</td>
                            <td>{leader.username}</td>
                            <td>{leader.totalAsanas}</td>
                            <td>{leader.totalCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeadershipBoard;
