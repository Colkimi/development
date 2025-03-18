import React, { useEffect, useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axios.get("http://localhost:5000/api/notes");
      setNotes(response.data);
    };
    fetchNotes();
  }, []);

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:5000/api/notes", { title, content });
    setNotes([...notes, response.data]);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={handleAddNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
