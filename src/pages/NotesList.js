import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
  
    const params = {
      search: search || "",
      fromDate: fromDate ? new Date(fromDate).toISOString() : null,
      endDate: endDate ? new Date(endDate).toISOString() : null,
    };
  
    console.log("Sending request with params:", params);
  
    try {
      const res = await axios.get("http://localhost:5140/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
  
      console.log("Response received:", res.data);
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err.response);
      alert(`Failed to fetch notes: ${err.response?.data?.message || "Unknown error"}`);
    }
  };
  

  // useEffect now correctly includes fetchNotes
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div>
      <h2>Your Notes</h2>
      <input
        placeholder="Search title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={fetchNotes}>Filter</button>
      <button onClick={() => navigate('/create')}>Create Note</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <button onClick={() => navigate(`/edit/${note.id}`)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;