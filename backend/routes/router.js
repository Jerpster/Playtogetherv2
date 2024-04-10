const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const { User } = require('../models/schemas')
const Event = require('../models/schemas').Event;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

router.post('/contact', async (req, res) => {
    const { email, website, message } = req.body

    const contactData = { email: email, website: website, message: message }
    const newContact = new schemas.Contact(contactData)
    const saveContact = await newContact.save()
    if (saveContact) {
        res.send('Message sent. Thank you.')
    } else {
        res.send('Failed to send message.')
    }

    res.end()
})

router.post('/registration', async (req, res) => {
    const { username, email, password } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }
    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = { username, email, password: hashedPassword };

        const newUser = new schemas.User(userData);

        const savedUser = await newUser.save();

        if (savedUser) {
            res.status(201).send('User registered successfully.');
        } else {
            res.status(500).send('Failed to register user.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to register user.');
    }
});

router.post('/login', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or email.' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password.' });
        }

        // If authentication is successful, generate a JWT token
        const token = jwt.sign({ username: user.username }, '12345', { expiresIn: '1h' });

        console.log('User logged in:', user.username); // Log successful login

        // Send the token back to the client along with other data
        return res.json({ message: 'Login successful.', user: user, token: token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});


router.post('/events', async (req, res) => {
    try {
      const { name, date, time } = req.body;
      
      const newEvent = new Event({
        name: name,
        date: date,
        time: time
      });
  
      const savedEvent = await newEvent.save();
  
      res.status(201).json(savedEvent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create event.' });
    }
  });
  
  
  router.get('/events', async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch events.' });
    }
  });
  

router.post('/events/:eventId/signup', async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const { name } = req.body; 
  
      // Add participant name to the event participants array
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        { $addToSet: { participants: name } }, 
        { new: true }
      );
      
      if (!updatedEvent) {
        console.error('Event not found.');
        return res.status(404).json({ error: 'Event not found.' });
      }
  
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error('Error signing up for event:', error);
      res.status(500).json({ error: 'Failed to sign up for event.' });
    }
  });
  

  router.delete('/events/:eventId', async (req, res) => {
    try {
      const eventId = req.params.eventId;
  
      await Event.findByIdAndDelete(eventId);
  
      res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ error: 'Failed to delete event.' });
    }
  });
  

router.get('/users', (req, res) => {
    const userData =
        [
            {
                "id": 1,
                "name": "test1",
                "email": "test1@test.se",
                "website": "Google"
            },
            {
                "id": 2,
                "name": "test2",
                "email": "test2@test.se",
                "website": "A friend"
            },
            {
                "id": 3,
                "name": "test3",
                "email": "test3@test.se",
                "website": "Other"
            }
        ]

    res.send(userData)
})

module.exports = router
