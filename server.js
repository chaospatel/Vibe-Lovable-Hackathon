const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'your_jwt_secret_key'; // Change this to a strong secret in production
const users = []; // In-memory user store (replace with a database in production)

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { email, password, name, type } = req.body;
  if (!email || !password || !name || !type) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (users.find(u => u.email === email && u.type === type)) {
    return res.status(409).json({ error: 'User already exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = { email, password: hashed, name, type, id: Date.now().toString() };
  users.push(user);
  res.json({ message: 'User created' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password, type } = req.body;
  const user = users.find(u => u.email === email && u.type === type);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, name: user.name, type: user.type }, SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user.id, name: user.name, type: user.type, email: user.email } });
});

// Protected route example
app.get('/api/profile', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(auth.split(' ')[1], SECRET);
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
