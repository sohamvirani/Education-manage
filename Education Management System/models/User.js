const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  emailAddress: { 
    type: String, 
    required: true, 
    unique: true 
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  userRole: { 
    type: String, 
    enum: ["Admin", "Teacher", "Student"], 
    default: "Student" 
  },
});

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next(); // Only hash if password is new or modified
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

// Method to verify the password
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
