const dotenv = require('dotenv');

dotenv.config();

const jwtConfig = {
  secret: process.env.JWT_SECRET || 'default_secret_key', 
  options: {
    expiresIn: '60m', // Token expires in 1 hour
  }
};

module.exports = jwtConfig;
