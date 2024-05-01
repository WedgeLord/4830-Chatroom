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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
