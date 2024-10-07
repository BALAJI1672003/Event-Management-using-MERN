import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode"; // Use named import for jwt-decode
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to track if user is admin
  const navigate = useNavigate();

  // Check if the user is an admin based on the JWT token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);  // Use jwtDecode here
        if (decodedToken.isAdmin) {
          setIsAdmin(true); // Set isAdmin to true if the role is admin
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  // Logout functionality with toast notification
  const handleLogout = () => {
    toast.success("Successfully logged out!"); // Show success toast
    setTimeout(() => {
      localStorage.removeItem('token'); // Remove the token from localStorage
      navigate('/'); // Redirect to login page
    }, 2000); // Wait for 2 seconds before logging out
  };

  return (
    <motion.div
      className="fixed left-0 w-full h-16 shadow-lg bg-blue"
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      transition={{ duration: 2, type: "spring", stiffness: 50 }}
    >
      <div className="container flex items-center justify-between h-full p-4 mx-auto bg-black">
        <div className="text-xl font-bold text-white title">SIET-EVENTS</div>
        
        {/* Hamburger button for mobile */}
        <button onClick={() => setOpen(!open)} className="text-white lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navbar links for larger screens */}
        <div className="hidden h-full lg:flex">
          <ul className="flex items-center gap-2 space-x-4 font-poppins">
            <li className="font-poppins">
              <Link to='/upcomingEvents' className="text-xl text-white border-white hover:border-b-2">Upcoming Events</Link>
            </li>
            <li>
              <Link to='/popularEvents' className="text-xl text-white border-white hover:border-b-2">Popular Events</Link>
            </li>
            {isAdmin && (
              <li>
                <Link to='/addEvents' className="text-xl text-white border-white hover:border-b-2">Add Event</Link>
              </li>
            )}
            <li>
              <Link to='/contact' className="text-xl text-white border-white hover:border-b-2">Contact</Link>
            </li>
            <li>
              <button 
                onClick={handleLogout} 
                className="text-xl text-white border-white hover:border-b-2">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden">
          <ul className="p-4 text-white bg-blue-900 font-poppins">
            <li className='font-poppins'><Link to='/' onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to='/upcomingEvents' onClick={() => setOpen(false)}>Upcoming Events</Link></li>
            <li><Link to='/popularEvents' onClick={() => setOpen(false)}>Popular Events</Link></li>
            {isAdmin && (
              <li><Link to='/addEvents' onClick={() => setOpen(false)}>Add Event</Link></li>
            )}
            <li><Link to='/contact' onClick={() => setOpen(false)}>Contact</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      )}
      
      <ToastContainer /> {/* Add the ToastContainer here */}
    </motion.div>
  );
}

export default Navbar;
