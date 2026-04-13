const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'staff'],
    default: 'user'
  }
});

// Use an async function without the 'next' parameter. 
// Mongoose will automatically handle the promise resolution.
userSchema.pre('save', async function() {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return; // Just return to skip hashing
  }

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // No need to call next() here; returning from an async function is enough
  } catch (error) {
    // If an error occurs, throw it so Mongoose can catch it
    throw error;
  }
});

module.exports = mongoose.model('User', userSchema);