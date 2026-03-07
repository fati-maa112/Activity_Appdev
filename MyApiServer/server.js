const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Dummy user store
let users = [];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.json({ message: 'Login successful', user });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  users.push({ username, email, password });
  return res.json({ message: 'Registration successful' });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});