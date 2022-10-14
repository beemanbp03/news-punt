const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/admin', authController.isLoggedIn, (req, res) => {
    if (req.admin) {
        res.render('admin', {
            user: req.user,
            admin: req.admin
        });
    } else {
        res.render('home', {
            user: req.user,
            admin: req.admin
        });
    }
});

router.get('/home', authController.isLoggedIn, (req, res) => {
    res.render('home', {
        user: req.user,
        admin: req.admin
    });
});

router.get('/login', authController.isLoggedIn, (req, res) => {
    res.render('login', {
        user: req.user,
        admin: req.admin
    });
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

module.exports = router;