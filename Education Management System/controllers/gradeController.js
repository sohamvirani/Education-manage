const gradeService = require('../services/gradeService');
const courseService = require('../services/courseService');
const httpErrors = require('http-errors');

const gradeController = {
  async assignGrade(req, res, next) {
    try {
      const { courseId, studentId } = req.params;
      const { grade, feedback } = req.body;

      const courseDetails = await courseService.findCourseById(courseId);
      if (!courseDetails) return next(new httpErrors.NotFound('Specified course does not exist'));

      const gradeAssignment = await gradeService.assignGrade(studentId, courseId, grade, feedback);
      return res.status(201).json({ message: 'Grade successfully assigned', gradeAssignment });
    } catch (err) {
      next(err);
    }
  },

  async getGrades(req, res, next) {
    try {
      const { studentId } = req.params;
      const studentGrades = await gradeService.getGrades(studentId);
      return res.status(200).json(studentGrades);
    } catch (err) {
      next(err);
    }
  },

  async getCourseGrade(req, res, next) {
    try {
      const { courseId, studentId } = req.params;
      const specificGrade = await gradeService.getCourseGrade(studentId, courseId);
      
      if (!specificGrade) return next(new httpErrors.NotFound('Grade not located for the specified course'));
      
      return res.status(200).json(specificGrade);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = gradeController;
