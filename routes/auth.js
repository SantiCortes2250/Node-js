// routers for authenticate users
const express = require('express');
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


//login user
//api/user

router.post('/',
    [
        check('email', 'add valid email').isEmail(),
        check('password', 'Password require minimum 6 characters').isLength({ min: 6})
    ],
    authController.authenticateUser
)

//get authenticated user
router.get('/',
    auth,
    authController.userAuthenticated
)

module.exports = router;