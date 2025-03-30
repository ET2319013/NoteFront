import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {

  const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5140/api/hello")
            .then(response => setMessage(response.data.message))
            .catch(error => console.error("Error fetching message:", error));
    }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>Notes Manager</h1>
      <p>{message || "Loading..."}</p>
    </div>
  );
}

export default App;
