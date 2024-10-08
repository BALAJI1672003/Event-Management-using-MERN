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

  // Create a new event using the fields from the request
  const newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    chiefGuest: req.body.chiefGuest, // Added chiefGuest field
    date: req.body.date,
    price: req.body.price,
    availableSeats: req.body.availableSeats,
    popularEvent: req.body.popularEvent, // Include popularEvent field
    imageUrl: req.file.path, // Image URL from the uploaded file
  });

  try {
    // Save the new event to the database
    const savedEvent = await newEvent.save();
    // Send the saved event back as a response
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).send(error); // Send error response if something goes wrong
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
  const { seats } = req.body;

  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).send('Event not found');

  if (seats > event.availableSeats) {
    return res.status(400).send('Not enough available seats');
  }

  const newBooking = new Booking({
    event: event._id,
    user: req.user._id,
    seats: seats
  });

  try {
    await newBooking.save();
    event.availableSeats -= seats;
    await event.save();
    res.json({ message: 'Booking successful!', booking: newBooking });
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get('/bookings', async (req, res) => {
  const { eventName } = req.query;

  try {
      // Find the event by name
      const event = await Event.findOne({ name: eventName });
      if (!event) {
          return res.status(404).json({ message: 'Event not found' });
      }

      // Find bookings related to the event and populate user and event details
      const bookings = await Booking.find({ event: event._id })
          .populate('user', 'name email') // Populate user fields as needed
          .exec();

      // If you want to return the event name in the response, you can do that as well
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
