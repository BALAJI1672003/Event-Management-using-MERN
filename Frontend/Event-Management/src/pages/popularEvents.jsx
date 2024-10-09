import React, { useEffect, useState } from 'react';
import Carousel from '../components/PopularEventsSlider'; // Ensure the correct import path
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component
import axios from 'axios';
import EventCard from '../components/EventCard'; // Import your EventCard component

let slides = [
  "https://media.vsstatic.com/image/upload/if_fc_gte_1/g_auto,q_auto,c_fill,w_1680,h_720/if_else/g_center,q_auto,c_fill,w_1680,h_720/if_end/dpr_auto,f_auto/hero/category/17-pop/pop-tickets-1.jpg",
  "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3661650/pexels-photo-3661650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1983046/pexels-photo-1983046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2263410/pexels-photo-2263410.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/21790481/pexels-photo-21790481/free-photo-of-woman-sitting-with-arm-raised-in-crowd-at-concert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const PopularEvents = () => {
  const [popularEvents, setPopularEvents] = useState([]);

  useEffect(() => {
    const fetchPopularEvents = async () => {
      try {
        const response = await axios.get('https://eventmanagement-backend-2.onrender.com/api/event/popular');
        setPopularEvents(response.data);
      } catch (error) {
        console.error('Error fetching popular events:', error);
      }
    };

    fetchPopularEvents();
  }, []);

  return (
    <>
    <Navbar/>
      <div className="flex items-center justify-center min-h-[100%] p-10 pt-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="w-screen h-screen m-auto -z-1 pt-11">
          <Carousel slides={slides} />
        </div>
      </div>
      <div className="p-10 bg-white">
        <h2 className="mb-6 text-2xl font-semibold text-center">Popular Events</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularEvents;
