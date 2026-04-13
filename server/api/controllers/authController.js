const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Import the bcrypt library for password hashing

const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    // Calling save() triggers the pre('save') hook in User.js to automatically hash the password!
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username already exists.' });
    }
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 1. Find the user by their username
    const user = await User.findOne({ username: username });
    
    // 2. If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // 3. Use bcrypt.compare to check if the entered password matches the hashed password in the Database
    const isMatch = await bcrypt.compare(password, user.password);
    
    // 4. If the passwords do not match, return an error
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    
    // 5. Success! Return the user login information
    res.status(200).json({ 
      _id: user._id, 
      username: user.username, 
      role: user.role 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };