const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const dbController = require('../controllers/dbController');

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

router.get('/', (req, res) => res.redirect('/home'));

router.get('/home', authController.isLoggedIn, (req, res) => {
    res.render('home', {
        user: req.user,
        admin: req.admin,
    });
});

router.get('/login', (req, res) => {
    res.render('login', {
        user: req.user,
        admin: req.admin
    });
});

module.exports = router;