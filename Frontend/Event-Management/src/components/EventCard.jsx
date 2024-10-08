import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import sampleImage from '../assets/Screenshot 2024-10-07 123930.png';

const EventCard = ({ event }) => {
  const navigate = useNavigate(); // Get navigate function from useNavigate hook

  const handleViewDetails = () => {
    // Navigate to the event details page when the button is clicked
    navigate(`/event/${event._id}`);
  };
  const imageUrl = `http://localhost:5000/${event.imageUrl}`;
  return (
    <div className="overflow-hidden rounded-lg shadow-md">
      <img
        src={imageUrl}
        alt={event.name}
        className="object-cover w-[100%] h-48"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{event.name}</h3>
        <p className="text-gray-600">{event.description.substring(0, 100)}...</p>
        <button 
          onClick={handleViewDetails}
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
