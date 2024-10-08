import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

const ShowEventDetails = () => {
  const { id } = useParams(); // Get event id from URL params
  const [event, setEvent] = useState(null); // Store event details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/event/details/${id}`);
        setEvent(response.data); // Set event data
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch event details'); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error message

  return (
    <div className="max-w-4xl p-6 mx-auto mt-8 bg-white rounded-lg shadow-md">
      {event && (
        <>
          <img
            src={event.imageUrl.includes('http') ? event.imageUrl : `http://localhost:5000/${event.imageUrl}`} 
            alt={event.title}
            className="object-cover w-full h-64 rounded-md"
          />
          <div className="mt-4">
            <h1 className="mb-2 text-3xl font-bold">{event.title}</h1>
            <p className="mb-4 text-gray-600">{event.description}</p>
            <div className="flex items-center justify-between text-gray-700">
              <p><strong>Chief Guest:</strong> {event.chiefGuest}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center justify-between mt-4 text-gray-700">
              <p><strong>Price:</strong> ${event.price}</p>
              <p><strong>Available Seats:</strong> {event.availableSeats}</p>
            </div>
            {event.popularEvent && (
              <div className="p-2 mt-6 text-sm text-yellow-800 bg-yellow-100 rounded">
                Popular Event
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowEventDetails;
