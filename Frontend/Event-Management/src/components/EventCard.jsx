import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const EventCard = ({ event }) => {
  const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false); 

  const handleViewDetails = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/event/${event._id}`);
    }, 500);
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
          className={`px-4 py-2 mt-4 text-white rounded ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'View Details'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
