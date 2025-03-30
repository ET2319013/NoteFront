import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotesList from './pages/NotesList';
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';

function App() {
  return (
    <div>
      <a href="/login" class="btn">Login</a>
      <a href="/register" class="btn">Register</a>
      <a href="/noteslist" class="btn">Notes List</a>
      <a href="/create" class="btn">Create</a>
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
