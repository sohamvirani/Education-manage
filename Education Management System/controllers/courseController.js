const courseService = require('../services/courseService');

const courseController = {
  async createCourse(req, res, next) {
    try {
      const newCourse = await courseService.createCourse(req.body);
      res.status(201).json(newCourse);
    } catch (err) {
      next(err);
    }
  },

  async getCourses(req, res, next) {
    try {
      const allCourses = await courseService.getAllCourses();
      res.json(allCourses);
    } catch (err) {
      next(err);
    }
  },

  async updateCourse(req, res, next) {
    try {
      const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
      res.json(updatedCourse);
    } catch (err) {
      next(err);
    }
  },

  async deleteCourse(req, res, next) {
    try {
      await courseService.deleteCourse(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },

  async getEnrolledCourses(req, res) {
    try {
      const enrollments = await Enrollment.find({ studentId: req.user._id }).populate('courseId');
      
      if (!enrollments.length) {
        return res.status(404).json({ message: 'No courses found for enrollment' });
      }

      res.status(200).json(enrollments.map(enroll => ({
        id: enroll.courseId._id,
        title: enroll.courseId.title,
        description: enroll.courseId.description,
      })));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getAllCourses(req, res) {
    try {
      const courseList = await Course.find();
      
      if (!courseList.length) {
        return res.status(404).json({ message: 'No courses currently available' });
      }

      res.status(200).json(courseList);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = courseController;
