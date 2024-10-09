import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'; 
import Navbar from '../components/Navbar';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    chiefGuest: '',
    date: '',
    price: '',
    availableSeats: '',
    popularEvent: false,
  });

  const [image, setImage] = useState(null); 
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    if (new Date(formData.date) < new Date()) {
      toast.error('Event date cannot be in the past.');
      return;
    }

    const formDataWithImage = new FormData();
    formDataWithImage.append('title', formData.title);
    formDataWithImage.append('description', formData.description);
    formDataWithImage.append('chiefGuest', formData.chiefGuest);
    formDataWithImage.append('date', formData.date);
    formDataWithImage.append('price', formData.price);
    formDataWithImage.append('availableSeats', formData.availableSeats);
    formDataWithImage.append('popularEvent', formData.popularEvent);
    if (image) {
      formDataWithImage.append('image', image); 
    }

    try {
      setUploading(true);
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await axios.post('https://eventmanagement-backend-2.onrender.com/api/event/addEvent', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          'Authorization': `Bearer ${token}` // Send the token in the request header
        },
      });

      if (response.status === 201) {
        toast.success('Event added successfully!');
        setFormData({
          title: '',
          description: '',
          chiefGuest: '',
          date: '',
          price: '',
          availableSeats: '',
          popularEvent: false,
        });
        setImage(null); 
      } else {
        toast.error('Failed to add event.');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-10 mt-20 bg-white rounded-lg shadow-lg"
        encType="multipart/form-data"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Add Event</h2>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Chief Guest Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="chiefGuest">
            Chief Guest
          </label>
          <input
            type="text"
            id="chiefGuest"
            name="chiefGuest"
            value={formData.chiefGuest}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Date Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Available Seats Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="availableSeats">
            Available Seats
          </label>
          <input
            type="number"
            id="availableSeats"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Image File Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="imageUrl">
            Event Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Popular Event Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="popularEvent"
            name="popularEvent"
            checked={formData.popularEvent}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700" htmlFor="popularEvent">
            Mark as Popular Event
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full p-2 text-white transition duration-300 bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          {uploading ? 'Uploading...' : 'Add Event'}
        </button>
      </form>
    </div>
    </>
  );
};

export default AddEvent;
