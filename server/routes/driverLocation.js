const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const dbConfig = require('../config');

const db = mongojs(dbConfig.URI, ['driversLocation']);

// update driver socket id
router.put('/:id', (req, res, next) => {
  const io = req.app.io;
  if (!req.body) {
    res.status(400);
    res.json({error: 'Bad data'});
  } else {
    db.driversLocation.update(
      {_id: mongojs.ObjectID(req.params.id)},
      {$set: {socketId: req.body.socketId}},
      (err, updateDetails) => {
        if (err) {
          res.send(err);
        } else {
          res.send(updateDetails);
        }
      },
    );
  }
});

// get nearby driver
router.get('/', (req, res, next) => {
  db.driversLocation.ensureIndex('coordinate', '2dsphere');
  db.driversLocation.find({
    coordinate: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(req.query.longitude),
            parseFloat(req.query.latitude),
          ],
        },
        $maxDistance: 10000,
      },
    },
    function(err, location) {
      if (err) {
        res.send(err);
      } else {
        res.send(location);
      }
    },
  });
});

module.exports = router;
