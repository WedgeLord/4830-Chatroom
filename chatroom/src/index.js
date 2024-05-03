const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/chatroom', require('./routes/chatroom'));

app.use('/chatroom', chatroomRoutes);
app.use('/auth', authRoutes);

mongoose.connect('mongodb://localhost:27017/chatroom', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/user/:user', (req, res) => {
    targetUser = req.params.user
    // add code for getting database chat history of user
    chats = {
        // {
            // sender:,
            // chats: 
        // }
    };
    res.status(201).json({
        message: "Chat history updated successfully",
        history: chats
    });
});

app.post('/user/:targetUser', (req, res) => {
    targetUser = req.params.targetUser
    chat = req.message;
    // add code for updating target user's chatroom
    res.status(201).json({
        message: "Chat sent to user " + targetUser + " successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
