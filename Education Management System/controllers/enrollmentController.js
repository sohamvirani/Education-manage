const Enrollment = require('../models/Enrollment'); // Verify path is correct
const Course = require('../models/Course'); // Assuming Course model is in place
const User = require('../models/User'); // Assuming User model is available

const enrollmentController = {
  // Handles student enrollment into a course
  async enrollStudent(req, res) {
    try {
      const { courseId } = req.body; // Course ID expected from request body
      const enrollmentData = new Enrollment({
        studentId: req.user._id, // Uses student ID from authenticated user
        courseId,
      });

      await enrollmentData.save();
      return res.status(201).json({ message: 'Enrollment completed successfully', enrollmentData });
    } catch (err) {
      console.error('Enrollment Error:', err);
      return res.status(500).json({ message: 'An error occurred while processing the enrollment' });
    }
  },

  async unenrollStudent(req, res) {
    try {
      const removedEnrollment = await Enrollment.findByIdAndDelete(req.params.id);

      if (!removedEnrollment) {
        return res.status(404).json({ message: 'No enrollment record found to delete' });
      }

      return res.status(200).json({ message: 'Unenrollment successful' });
    } catch (err) {
      console.error('Unenrollment Error:', err);
      return res.status(500).json({ message: 'An error occurred while processing the unenrollment' });
    }
  },

  async getEnrollments(req, res, next) {
    try {
      const { studentId } = req.params;
      const studentEnrollments = await enrollmentService.getEnrollments(studentId);
      return res.status(200).json(studentEnrollments);
    } catch (err) {
      console.error('Get Enrollments Error:', err);
      next(err);
    }
  }
};

module.exports = enrollmentController;
