const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    const { content, sender } = req.body;
    try {
        const newMessage = new Message({ content, sender });
        await newMessage.save();
        res.json(newMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
