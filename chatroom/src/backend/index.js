const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const configs = require('../config.js');
const bcrypt = require('bcrypt');
const User = require('../models/user.js')
const Message = require('../models/message.js')

app.use(bodyParser.json());


// CORS

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})


// MongoDB connection

const connectionString = configs.database;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));


// API Endpoints

app.post('/createaccount', async (req, res) => {
  try {
    console.log('API creating account');
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists != null) {
      res.status(400).send({ message: 'User already exists' });
    }
    else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({ username: req.body.username, password: hashedPassword });
      await user.save();
      res.status(201).send({ message: 'User created successfully' });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error creating user'});
  }
});

app.get('/directory', async (req, res) => {
  try {
    console.log('API getting all users');
    const users = await User.find({});
    // console.log(users);
    if (users != null) {
      let usernames = users.map(user => {return user.username});
      console.log(usernames);
      res.status(200).send({ message: "users found", users: usernames });
    }
    else {
      res.status(404).send({ message: 'No users found' });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error getting users'});
  }
});

app.post('/login', async (req, res) => {
  console.log('API logging in');
  const user = await User.findOne({ username: req.body.username });
  if (user == null) {
    return res.status(400).send({ message: 'Cannot find user' });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).send({message: 'Success'});
    } else {
      res.status(500).send({message: 'Not Allowed'});
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

app.get('/history/:user/:target', async (req, res) => {
  sender = req.params.user;
  recipient = req.params.target;
  console.log('API getting chats for ' + recipient);
  try {
    const messages = await Message.find({
    //   sender: req.query.sender,
    //   recipient: req.query.recipient
        sender: sender,
        recipient: recipient
    }).sort({time: 1});
    res.status(200).json(messages);
  }
  catch (error) {
    console.log(error);
    res.status(500).send({message: 'Error retrieving messages'});
  }
});

app.post('/send', async (req, res) => {
  try {
    console.log('API sending');
    const message = new Message({
      sender: req.body.sender,
      recipient: req.body.recipient,
      content: req.body.content,
    });
    await message.save();
    res.status(201).send({message: 'Message sent successfully'});
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error sending message'});
  }
});

app.get('/userexists/:username', async (req, res) => {
  console.log('API checking if user exists');
  const username = req.params.username;
  try {
    const user = await User.findOne({ username: username });
    if (user != null) {
      res.status(200).send({ message: 'User exists' });
    } else {
      res.status(404).send({message: 'User does not exist'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({message: 'Error checking user'});
  }
});

module.exports = app