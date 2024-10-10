const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Update the path if necessary
const jwtConfig = require('../config/jwt'); // JWT configuration import

const authController = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // JWT creation
    const token = jwt.sign(
      { id: user._id, role: user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.options.expiresIn }
    );

    return res.status(200).json({ token }); // Respond with the token
  },

  async signup(req, res, next) {
    try {
      const newUser = await authService.signup(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
