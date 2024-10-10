const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  learner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  courseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  score: { 
    type: Number, 
    required: true 
  },
  remarks: { 
    type: String 
  }
});

module.exports = mongoose.model('Grade', gradeSchema);
