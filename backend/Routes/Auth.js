const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword, isAdmin });

  try {
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Email not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
  res.json({ "token":token });
})

module.exports = router;
