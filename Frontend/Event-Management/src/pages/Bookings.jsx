import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingComponent = () => {
    const [eventName, setEventName] = useState('');
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/event/bookings?eventName=${eventName}`);
            setBookings(response.data);
            toast.success('Bookings fetched successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to fetch bookings. Please try again.');
            toast.error('Failed to fetch bookings. Please try again.'); // Error toast
        }
    };

    return (
        <div className='flex flex-col items-center justify-start p-6 rounded-lg shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            <h1 className='mb-4 text-2xl font-bold text-white'>View Bookings</h1>
            <form onSubmit={handleSearch} className='w-full max-w-md'>
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Enter event name"
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400'
                />
                <button 
                    type="submit" 
                    className='w-full py-2 mt-4 font-semibold text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700'
                >
                    Search
                </button>
            </form>
            <ul className='w-full mt-4'>
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <li key={booking._id} className='p-2 border-b border-gray-300'>
                            <p className='font-semibold text-white'>Booking ID: {booking.bookingId}</p>
                            <p className='text-white'>User: {booking.name} (Email: {booking.userEmail})</p>
                        </li>
                    ))
                ) : (
                    <p className='text-center text-gray-200'>No bookings found.</p>
                )}
            </ul>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
        </div>
    );
};

export default BookingComponent;
