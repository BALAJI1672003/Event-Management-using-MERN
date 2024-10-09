import React from 'react';
import { motion } from 'framer-motion';
import collegeEventImage from '../assets/band_doodle.png'; // Add your image path here
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    if (!token) {
      navigate('/'); 
    }
  }, [token, navigate]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-10 pt-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <Navbar className="w-screen"/>
        {/* Updated container with increased max-width */}
        <div className="flex flex-col items-center justify-center overflow-hidden bg-white rounded-lg shadow-lg md:flex-row md:max-w-4xl lg:max-w-5xl">
          {/* Left Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center md:w-1/2 h-80 md:h-full min-h-32"
          >
            <img
              src={collegeEventImage}
              alt="College Event"
              className="w-[80%] p-8 min-h-[25rem] min-w-[20rem]"
            />
          </motion.div>

          {/* Right Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="p-10 text-center md:text-left"
          >
            <h1 className="mb-4 text-5xl font-extrabold text-gray-800 md:text-6xl">
              <span className="text-pink-600">EventiaHub</span><br/>Where Euphoria is Just a Click Away!
            </h1>
            <p className="mb-6 text-xl leading-relaxed text-gray-600 md:text-2xl">
              Experience the excitement of college life with our extraordinary events! From cultural fests to academic seminars, sports, and beyond. <span className='font-bold'>EventiaHub</span> offers a platform where every event shines.
            </p>
            <Link to='/upcomingEvents'>
              <motion.a
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 font-semibold tracking-wide text-white uppercase rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-pink-500"
              >
                Discover Events
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
