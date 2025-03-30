import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotesList from './pages/NotesList';
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';
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
    <h1>React + .NET 8 API</h1>
      <p>{message || "Loading..."}</p>
    <h1>My notes</h1>
    <a class="btn btn-sm btn-outline-secondary" href="/noteslist/">
    NotesList </a>
    <a class="btn btn-sm btn-outline-secondary" href="/login/">
    Login </a>
    <a class="btn btn-sm btn-outline-secondary" href="/register/">
    Register </a>


    <Router>
      <Routes>
        <Route path="/noteslist" element={<NotesList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
