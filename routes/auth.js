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

router.get('/profile', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('profile', {
            user: req.user,
            admin: req.admin
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/profile', authController.editProfile);




module.exports = router;