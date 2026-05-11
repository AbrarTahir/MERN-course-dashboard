const express = require('express');

const {
  registerUser,
  loginUser,
} = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


// Register Route
router.post('/register', registerUser);


// Login Route
router.post('/login', loginUser);


// Protected Route
router.get(
  '/profile',
  authMiddleware,
  (req, res) => {

    res.json({
      message: 'Protected route accessed ✅',
      user: req.user,
    });

  }
);


module.exports = router;