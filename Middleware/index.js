const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.post('/register', (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  if (!isValidName(firstName) || !isValidName(lastName)) {
    return res.status(400).json({ error: 'First and last name must start with a capital letter' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ error: 'Invalid password format' });
  }

  if (!isValidPhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  res.status(200).json({ message: 'User registered successfully' });
});

function isValidName(name) {
  return /^[A-Z][a-z]*$/.test(name);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  const regex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

function isValidPhoneNumber(phoneNumber) {
  return /^\d{10,}$/.test(phoneNumber);
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
