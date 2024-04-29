const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(404).send('User not found');
    } else {
      if (user.password !== password) {
        res.status(401).send('Incorrect password');
      } else {
        const token = jwt.sign({ username: user.username }, config.secret);
        res.json({ token });
      }
    }
  });
});

module.exports = router;
