import React, { useState } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [events, setEvents] = useState([]);
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddEvent = () => {
    if (eventDescription.trim()) {
      setEvents([
        ...events,
        { description: eventDescription, date: eventDate },
      ]);
      setEventDescription('');
    }
  };

  const handleRemoveEvent = (index) => {
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
  };

  const handleEditEvent = (index) => {
    setIsEditing(true);
    setEventDescription(events[index].description);
    setEventDate(new Date(events[index].date));
    setEditIndex(index);
  };

  const handleUpdateEvent = () => {
    const updatedEvents = events.map((event, index) =>
      index === editIndex ? { description: eventDescription, date: eventDate } : event
    );
    setEvents(updatedEvents);
    setIsEditing(false);
    setEventDescription('');
    setEditIndex(null);
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
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <h3>{event.description}</h3>
            <p>{event.date.toLocaleString()}</p>
            <button onClick={() => handleEditEvent(index)}>Edit</button>
            <button onClick={() => handleRemoveEvent(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default App;
