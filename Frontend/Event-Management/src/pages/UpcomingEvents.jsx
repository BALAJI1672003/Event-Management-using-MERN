import React from 'react'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react'
import EventCard from '../components/EventCard'
import axios from 'axios'
const UpcomingEvents = () => {
  const [events,setEvents]=useState([]);
  useEffect(()=>{
  const fetchEvents=async()=>{
    try {
      const response = await axios.get('https://eventmanagement-backend-2.onrender.com/api/event/');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching popular events:', error);
    }
  };
  fetchEvents();
  },[])
  return (
    <div>
      <Navbar/>
      <div className="p-10 bg-white">
        <h2 className="mt-10 text-2xl font-semibold text-center">Upcoming-Events</h2>
        <hr></hr>
        <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UpcomingEvents
