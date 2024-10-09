import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const EventCard = ({ event, refreshEvents }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleViewDetails = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/event/${event._id}`);
    }, 500);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token'); 
    setIsDeleting(true); 
     
    try {
      const response = await axios.delete(`https://eventmanagement-backend-2.onrender.com/api/event/delete/${event._id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      toast.success('Event deleted successfully!');
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("You can't delete this event."); 
      }
    } finally {
      setIsDeleting(false); 
    }
  };
  const imageUrl = `https://eventmanagement-backend-2.onrender.com/${event.imageUrl}`;

  return (
    <div className="overflow-hidden rounded-lg shadow-md">
      <img
        src={imageUrl}
        alt={event.name}
        className="object-cover w-[100%] h-48"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{event.name}</h3>
          {localStorage.getItem('Admin') === 'true' && ( 
            <button
              onClick={handleDelete}
              className={`ml-4 text-red-600 hover:text-red-800 ${isDeleting ? 'cursor-not-allowed' : ''}`}
              disabled={isDeleting}
              title="Delete Event"
            >
              {isDeleting ? 'Deleting...' : <FaTrash />} 
            </button>
          )}
        </div>
        <p className="text-gray-600">{event.description.substring(0, 100)}...</p>
        <button
          onClick={handleViewDetails}
          className={`px-4 py-2 mt-4 text-white rounded ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'View Details'} 
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default EventCard;
