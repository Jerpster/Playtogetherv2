import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateEvent() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/events');
      setEvents(response.data);
    } catch (error) {
      setError('Failed to fetch events.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !date || !time) {
      setError('Please fill in all fields.');
    } else {
      try {
        const eventDate = new Date(date);
        const eventTime = new Date(time);
        eventDate.setHours(eventTime.getHours());
        eventDate.setMinutes(eventTime.getMinutes());

        await axios.post('http://localhost:4000/events', { name, date: eventDate, time }); 
        setError('Event created successfully.');

        fetchEvents();

        setName('');
        setDate('');
        setTime('');
      } catch (error) {
        setError('Failed to create event.');
      }
    }
  };

  const handleSignup = async (eventId) => {
    try {
      const participantName = prompt('Enter your name:');
      if (!participantName) return;

      await axios.post(`http://localhost:4000/events/${eventId}/signup`, { name: participantName });
      setError('Signed up for event successfully.');

      fetchEvents();
    } catch (error) {
      setError('Failed to sign up for event.');
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:4000/events/${eventId}`);
      setError('Event deleted successfully.');

      fetchEvents();
    } catch (error) {
      setError('Failed to delete event.');
    }
  };

  return (
    <>
      <h1>Create Event</h1>
      <form className="eventForm" onSubmit={handleSubmit}>
        <label>Event Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Time</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

        {error && <p className="error">{error}</p>}

        <button type="submit">Create Event</button>
      </form>

      <h2>Events</h2>
      {error && <p className="error">{error}</p>}
      <ul className="eventList">
        {events.map(event => (
          <li key={event._id} className="eventItem">
            <strong>{event.name}</strong> - Date: {new Date(event.date).toLocaleDateString()}, Time: {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            <button onClick={() => handleSignup(event._id)}>Sign Up</button>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
            <ul className="participantList">
              Participants:
              {event.participants.map(participant => (
                <li key={participant} className="participant">{participant}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CreateEvent;
















