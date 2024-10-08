import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.isAdmin) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  const handleLogout = () => {
    toast.success("Successfully logged out!");
    setTimeout(() => {
      localStorage.removeItem('token');
      navigate('/');
    }, 2000);
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 w-screen h-16 bg-pink-600 shadow-lg"
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      transition={{ duration: 2, type: "spring", stiffness: 50 }}
    >
      <div className="container flex items-center justify-between h-full p-4 mx-auto bg-pink-600">
        <Link to='/home'>
        <div className="text-xl text-white modern">EventiaHub</div>
        </Link>
        
        <button onClick={() => setOpen(!open)} className="text-white lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden h-full lg:flex">
          <ul className="flex items-center gap-2 space-x-4 modern">
            <li>
              <Link to='/upcomingEvents' className="text-xl text-white border-white hover:border-b-2">Upcoming Events</Link>
            </li>
            <li>
              <Link to='/popularEvents' className="text-xl text-white border-white hover:border-b-2">Popular Events</Link>
            </li>
            {isAdmin && (
              <li>
                <Link to='/admin' className="text-xl text-white border-white hover:border-b-2">AdminPanel</Link>
              </li>
            )}
            <li>
              <Link to='/contact' className="text-xl text-white border-white hover:border-b-2">Contact</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="text-xl text-white border-white hover:border-b-2">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {open && (
        <div className="lg:hidden">
          <ul className="p-4 text-white bg-blue-900">
            <li><Link to='/' onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to='/upcomingEvents' onClick={() => setOpen(false)}>Upcoming Events</Link></li>
            <li><Link to='/popularEvents' onClick={() => setOpen(false)}>Popular Events</Link></li>
            {isAdmin && (
              <li><Link to='/addEvent' onClick={() => setOpen(false)}>Add Event</Link></li>
            )}
            <li><Link to='/contact' onClick={() => setOpen(false)}>Contact</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      )}
      
      <ToastContainer />
    </motion.div>
  );
}

export default Navbar;
