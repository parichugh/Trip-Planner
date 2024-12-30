const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4005;

// Define the users array to store user data
let users = [];

// Serve static files
app.use(express.static(__dirname)); // This serves all files from the root

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve createaccount.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'creataccount.html')); // Ensure correct file name
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  console.log('Form Data Received:', req.body);

  // Process form data
  const user_id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

  const new_user = {
    id: user_id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  users.push(new_user);
  console.log(users);

  // Respond with a JSON success message
  res.json({ success: true, message: 'Account created successfully!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
