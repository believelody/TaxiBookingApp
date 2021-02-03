const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const dbConfig = require('../config');

const db = mongojs(dbConfig.URI, ['bookings']);

router.get('/bookings', (req, res, next) => {
  console.log('get bookings');
  db.bookings.find((err, bookings) => {
    if (err) {
      res.send(err);
    }
    res.json(bookings);
  });
});

router.post('/bookings', (req, res, next) => {
  const booking = req.body.data;
  if (!booking.userName) {
    res.status(400).json({
      error: 'Bad data',
    });
  } else {
    db.bookings.save(booking, (err, savedBooking) => {
      if (err) {
        res.send(err);
      }
      res.json(savedBooking);
    });
  }
});

module.exports = router;
