import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast

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

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      if (!token) {
        toast.error('No token found. Please log in.');
        return;
      }

      const response = await axios.post(
        `https://eventmanagement-backend-2.onrender.com/api/event/book/${id}`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );

      toast.success(response.data.message); // Show success toast
    } catch (err) {
      toast.error('Failed to book the event.'); // Show error toast
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error message

  const getImageUrl = (imageUrl) => {
    try {
      return new URL(imageUrl).href;
    } catch {
      return `http://localhost:5000/${imageUrl}`; 
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> {/* Add ToastContainer for the notifications */}
      <div className="max-w-6xl p-6 mx-auto mt-20 bg-white rounded-lg shadow-md">
        {event && (
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={getImageUrl(event.imageUrl)} 
                alt={event.title}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
            <div className="md:w-1/2 md:pl-6">
              <h1 className="mb-4 text-3xl font-bold">{event.title}</h1>
              <p className="mb-6 text-gray-600">{event.description}</p>
              <div className="flex items-center justify-between text-gray-700">
                <p><strong>Chief Guest:</strong> {event.chiefGuest}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center justify-between mt-4 text-gray-700">
                <p><strong>Price:</strong>{event.price}</p>
                <p><strong>Available Seats:</strong> {event.availableSeats}</p>
              </div>
              {event.popularEvent && (
                <div className="p-2 mt-6 text-sm text-yellow-800 bg-yellow-100 rounded">
                  Popular Event
                </div>
              )}
              <button 
                onClick={handleBooking}
                className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowEventDetails;
