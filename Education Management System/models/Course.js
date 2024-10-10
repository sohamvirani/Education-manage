const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  instructor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // Assigned instructor
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }], // Enrolled participants
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  }
});

module.exports = mongoose.model("Course", courseSchema);
