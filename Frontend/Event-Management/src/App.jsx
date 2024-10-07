import './App.css'
import {Route,BrowserRouter,Routes} from 'react-router-dom';
import Home from './pages/Home'
import popularEvents from './pages/popularEvents';
import UpcomingEvents from './pages/UpcomingEvents';
import AddEvent from './pages/AddEvent';
import Contact from './pages/Contact';
import BookingEvent from './pages/BookingEvent';
import login from './pages/login';
import Register from './pages/Register';
function App() {

  return (
    <BrowserRouter>
       
      <Routes>
      <Route path="/" Component={login}/>
      <Route path="/Home" Component={Home}/>
      <Route path="/popularEvents" Component={popularEvents}/>
      <Route path="/upcomingEvents" Component={UpcomingEvents}/>
      <Route path="/contact" Component={Contact}/>
      <Route path="/addEvent" Component={AddEvent}/>
      <Route path="/bookings/:id" Component={BookingEvent}/>
      <Route path="/register" Component={Register}/>
      </Routes>
    </BrowserRouter>
      )
    }

export default App
