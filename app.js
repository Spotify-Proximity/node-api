const express = require('express');
const app = express();
const PORT = 3003; // Use the specified port or default to 3000

// Define a route
app.get('/', (req, res) => {
    res.send('Hello Express!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});