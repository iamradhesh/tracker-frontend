import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { Low, JSONFileSync } from 'lowdb';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3080;
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg';
const adapter = new JSONFileSync('./database.json');
const db = new Low(adapter);

// Initialize middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
await db.read();
db.data ||= { users: [] };

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Basic home route
app.get('/', (_req, res) => {
  res.send('Auth API. Please use POST /register, POST /login & POST /verify for authentication');
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { email, userName, password } = req.body;
  const user = db.data.users.find(user => email === user.email);

  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  db.data.users.push({ email, userName, password: hashedPassword });
  await db.write();

  const token = jwt.sign({ email }, jwtSecretKey, { expiresIn: '1h' });

  res.status(201).json({ message: 'success', token });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.data.users.find(user => email === user.email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ email }, jwtSecretKey, { expiresIn: '1h' });
  res.status(200).json({ message: 'success', token });
});

// Verify endpoint
app.post('/verify', (req, res) => {
  const tokenHeaderKey = 'jwt-token';
  const authToken = req.headers[tokenHeaderKey];

  try {
    const verified = jwt.verify(authToken, jwtSecretKey);
    if (verified) {
      return res.status(200).json({ status: 'logged in', message: 'success' });
    } else {
      return res.status(401).json({ status: 'invalid auth', message: 'error' });
    }
  } catch (error) {
    return res.status(401).json({ status: 'invalid auth', message: 'error' });
  }
});

// Check account endpoint
app.post('/check-account', (req, res) => {
  const { email } = req.body;
  const user = db.data.users.find(user => email === user.email);

  res.status(200).json({
    status: user ? 'User exists' : 'User does not exist',
    userExists: !!user,
  });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
