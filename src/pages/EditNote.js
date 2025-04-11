
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditNote = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5140/api/notes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const note = res.data.find((n) => n.id === parseInt(id));
        if (note) {
          setTitle(note.title);
          setDescription(note.description);
        }
      } catch (err) {
        alert('Failed to fetch note');
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5140/api/notes/${id}`, { title, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      alert('Failed to update note');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Note</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditNote;
