require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User', { name: String, age: Number });
const app = express();
const PORT = 3003; 
const uri = process.env.MONGODB_CONNECTION_STRING;
const connection = mongoose.connection;

app.use(express.json());

mongoose.connect(uri, {
    dbName: 'Users',
});

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

app.get('/userList', async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users: users });
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({ error: error });
    }
})

app.post('/user', async (req, res) => {
    try {
        console.log("req.body: " + req.body.name + " " + req.body.age);
        const { name, age } = req.body;
        const user = new User({ name, age });
        await user.save();
        return res.status(200).json({ user: user });
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({ error: error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello Express!');
});
