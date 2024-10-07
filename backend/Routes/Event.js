const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel');
const Booking = require('../models/BookingModel');
const auth = require('../middleware/Authentication');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });
router.post('/',auth,upload.single('image'), async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).send('Access Denied');

  const newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    price: req.body.price,
    availableSeats: req.body.availableSeats,
    imageUrl: req.file.path
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

module.exports = router;
