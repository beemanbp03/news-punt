const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/register', authController.isLoggedIn, (req, res) => {
    res.render('register', {
        user: req.user
    });
});

router.get('/logout', authController.logout, (req, res) => {
    
});

router.post('/register', authController.register);
router.post('/login', authController.login);



module.exports = router;