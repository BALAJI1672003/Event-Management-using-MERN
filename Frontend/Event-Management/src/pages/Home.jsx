import React from 'react';
import { motion } from 'framer-motion';
import collegeEventImage from '../assets/4111006.jpg'; // Add your image path here
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Redirect to login if no token is present
  React.useEffect(() => {
    if (!token) {
      navigate('/'); // Redirect to home or login page
    }
  }, [token, navigate]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen p-10 pt-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        {/* Updated container with increased max-width */}
        <div className="flex flex-col items-center overflow-hidden bg-white rounded-lg shadow-lg md:flex-row md:max-w-4xl lg:max-w-5xl">
          {/* Left Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:w-1/2 h-80 md:h-full"
          >
            <img
              src={collegeEventImage}
              alt="College Event"
              className=""
            />
          </motion.div>

          {/* Right Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="p-10 text-center md:w-1/2 md:text-left"
          >
            <h1 className="mb-4 text-5xl font-extrabold text-gray-800 md:text-6xl">
              Welcome to <span className="text-pink-600">SIET EVENTS</span>
            </h1>
            <p className="mb-6 text-xl leading-relaxed text-gray-600 md:text-2xl">
              Experience the excitement of college life with our extraordinary events! From cultural fests to academic seminars, sports, and beyond, SIET offers a platform where every event shines.
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
