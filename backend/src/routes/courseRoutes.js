const express = require('express');

const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


// CREATE COURSE
router.post('/', authMiddleware, createCourse);


// GET COURSES
router.get('/', authMiddleware, getCourses);


// UPDATE COURSE
router.put('/:id', authMiddleware, updateCourse);


// DELETE COURSE
router.delete('/:id', authMiddleware, deleteCourse);


module.exports = router;