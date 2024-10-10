const Enrollment = require('../models/Enrollment');

const enrollmentService = {
  async registerStudent(studentId, courseId) {
    const newEnrollment = new Enrollment({ student: studentId, course: courseId });
    await newEnrollment.save();
    return newEnrollment;
  },

  async deregisterStudent(studentId, courseId) {
    return await Enrollment.findOneAndDelete({ student: studentId, course: courseId });
  },

  async fetchEnrollments(studentId) {
    return await Enrollment.find({ student: studentId }).populate('course');
  },
};

module.exports = enrollmentService;
