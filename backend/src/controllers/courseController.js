const Course = require('../models/Course');


// CREATE COURSE
const createCourse = async (req, res) => {
  try {

    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json(course);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET ALL COURSES
const getCourses = async (req, res) => {
  try {

    const courses = await Course.find({
      user: req.user.id,
    });

    res.status(200).json(courses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// UPDATE COURSE
const updateCourse = async (req, res) => {
  try {

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: 'Course not found',
      });
    }

    // Check ownership
    if (course.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedCourse);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// DELETE COURSE
const deleteCourse = async (req, res) => {
  try {

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: 'Course not found',
      });
    }

    // Check ownership
    if (course.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    await course.deleteOne();

    res.status(200).json({
      message: 'Course deleted successfully',
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
};