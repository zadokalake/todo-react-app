import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [events, setEvents] = useState([]);
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null); // Store MongoDB _id

  // Load tasks from backend
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getTasks();
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleAddEvent = async () => {
    if (eventDescription.trim()) {
      try {
        await createTask({ description: eventDescription, date: eventDate, time: eventDate.toLocaleTimeString() });
        fetchEvents();
        setEventDescription('');
      } catch (err) {
        console.error('Error adding task:', err);
      }
    }
  };

  const handleRemoveEvent = async (id) => {
    try {
      await deleteTask(id);
      fetchEvents();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleEditEvent = (event) => {
    setIsEditing(true);
    setEventDescription(event.description);
    setEventDate(new Date(event.date));
    setEditId(event._id); // Store MongoDB ID
  };

  const handleUpdateEvent = async () => {
    try {
      await updateTask(editId, { description: eventDescription, date: eventDate, time: eventDate.toLocaleTimeString() });
      fetchEvents();
      setIsEditing(false);
      setEventDescription('');
      setEditId(null);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <>
      {/* Background Decorative Images */}
      <div className="background-images">
        <img src="/image_2.png" alt="Decorative 2" className="image-2" />
        <img src="/image_3.png" alt="Decorative 3" className="image-3" />
      </div>

      <div className="app">
        <h1 className="app-title">Zadok To-Do Calendar</h1>

        <div className="calendar-container">
          <Calendar
            onChange={setEventDate}
            value={eventDate}
          />
        </div>

        <div className="background-images">
          <img src="/image_1.png" alt="Decorative 1" className="image-1" />
        </div>

        <div className="event-input-container">
          <input
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Event Description"
          />
          <button onClick={isEditing ? handleUpdateEvent : handleAddEvent}>
            {isEditing ? 'Update Event' : 'Add Event'}
          </button>
        </div>

        <div className="events-list">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.description}</h3>
              <p>{new Date(event.date).toLocaleString()}</p>
              <button onClick={() => handleEditEvent(event)}>Edit</button>
              <button onClick={() => handleRemoveEvent(event._id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
