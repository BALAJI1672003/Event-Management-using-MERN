const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel');
const Booking = require('../models/BookingModel');
const auth = require('../middleware/Authentication');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination:'./uploads/images',
  filename:(req,file,cb)=>{
      return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage: storage });
router.post('/addEvent', auth, upload.single('image'), async (req, res) => {
  // Check if the user is an admin
  if (!req.user.isAdmin) {
    return res.status(403).send('Access Denied');
  }

  const newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    chiefGuest: req.body.chiefGuest, 
    date: req.body.date,
    price: req.body.price,
    availableSeats: req.body.availableSeats,
    popularEvent: req.body.popularEvent, 
    imageUrl: req.file.path, 
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get('/popular', async (req, res) => {
  try {
    const popularEvents = await Event.find({ popularEvent: true });
    res.json(popularEvents);
  } catch (error) {
    console.error('Error fetching popular events:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

router.post('/book/:id', auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).send('Event not found');
  const newBooking = new Booking({
    name: event.name,
    event: event._id,
    user: req.user._id,
  });

  try {
    await newBooking.save();
    await event.save();
    res.json({ message: 'Booking successful!', booking: newBooking });
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get('/details/:id', async (req, res) => {
  try {
    console.log(req.params.id); // To log the event ID being requested
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" }); // Add return here
    }
    res.json(event); // Send the event details if found
  } catch (error) {
    res.status(500).json({ message: 'Server error', error }); // Changed to 500 for server errors
  }
})
router.get('/bookings', async (req, res) => {
  const { eventName } = req.query;

  try {
      const event = await Event.findOne({ name: eventName });
      if (!event) {
          return res.status(404).json({ message: 'Event not found' });
      }

      const bookings = await Booking.find({ event: event._id })
          .populate('user', 'name email')
          .exec();

      const formattedBookings = bookings.map(booking => ({
          bookingId: booking._id,
          name: booking.name,
          user: booking.user.name,
          userEmail: booking.user.email,
      }));

      res.json(formattedBookings);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

module.exports = router;
