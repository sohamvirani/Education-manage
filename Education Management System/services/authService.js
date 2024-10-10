const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authService = {
  async register(userDetails) {
    const newUser = new User(userDetails);
    await newUser.save();
    return newUser;
  },

  async login(email, password) {
    const existingUser = await User.findOne({ email });
    if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user: existingUser };
  },

  validateToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
};

module.exports = authService;
