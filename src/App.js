import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotesList from './pages/NotesList';
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';
import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import backendUrl from './Config';

function App() {

  const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(backendUrl + "/api/hello")
            .then(response => setMessage(response.data.message))
            .catch(error => console.error("Error fetching message:", error));
    }, []);

    const getUserEmailFromToken = () => {
      const token = localStorage.getItem('token');
      if (!token) return null;
    
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded.email || null;
      } catch (e) {
        return null;
      }
    };

  const email = getUserEmailFromToken();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div class="button-container" style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>React + .NET 9 API</h1>
      <p>{message || "Loading..."}</p>
    <h1>My notes</h1>
    <h1>User signed in: {email}</h1>
    {email && (
    <a class="btn btn-sm btn-outline-secondary" href="/noteslist/">
    NotesList </a>)
    }
    <a class="btn btn-sm btn-outline-secondary" href="/login/">
    Login </a>
    <a class="btn btn-sm btn-outline-secondary" href="/register/">
    Register </a>
    {email && (<a class="btn btn-sm btn-outline-secondary" href="/"
      onClick={(e) => {
      e.preventDefault(); // отменяет переход по ссылке
      handleLogout();
      }}>
        Logout  ({email})
    </a> )
    }
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
