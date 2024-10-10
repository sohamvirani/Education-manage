const Course = require('../models/Course');

const courseService = {
  async addCourse(courseDetails) {
    const newCourse = new Course(courseDetails);
    await newCourse.save();
    return newCourse;
  },

  async retrieveAllCourses() {
    return await Course.find();
  },

  async modifyCourse(courseId, updatedData) {
    return await Course.findByIdAndUpdate(courseId, updatedData, { new: true });
  },

  async removeCourse(courseId) {
    return await Course.findByIdAndDelete(courseId);
  },
};

module.exports = courseService;
