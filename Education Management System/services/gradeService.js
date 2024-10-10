const Grade = require('../models/Grade');

const gradeService = {
  async setGrade(studentId, courseId, gradeValue, feedbackMessage) {
    const newGrade = new Grade({
      student: studentId,
      course: courseId,
      grade: gradeValue,
      feedback: feedbackMessage,
    });
    await newGrade.save();
    return newGrade;
  },

  async retrieveGrades(studentId) {
    return await Grade.find({ student: studentId }).populate('course');
  },
};

module.exports = gradeService;
