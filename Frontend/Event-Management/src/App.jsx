import './App.css'
import {Route,BrowserRouter,Routes} from 'react-router-dom';
import Home from './pages/Home'
import popularEvents from './pages/popularEvents';
import UpcomingEvents from './pages/UpcomingEvents';
import Contact from './pages/Contact';
import login from './pages/login';
import Register from './pages/Register';
import AdminScreen from './pages/Admin';
import ShowEventDetail from './components/ShowEventDetails';
function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" Component={login}/>
      <Route path="/Home" Component={Home}/>
      <Route path="/popularEvents" Component={popularEvents}/>
      <Route path="/upcomingEvents" Component={UpcomingEvents}/>
      <Route path="/contact" Component={Contact}/>
      <Route path="/admin" Component={AdminScreen}/>
      <Route path="/register" Component={Register}/>
      <Route path="/event/:id" Component={ShowEventDetail} />
      </Routes>
    </BrowserRouter>
      )
    }

export default App
