// routers for create users
const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')
const { check } = require('express-validator')


//validate user
//api/user

router.post('/',
    [
        check('name', 'Name is obligate').not().isEmpty(),
        check('email', 'add valid email').isEmail(),
        check('password', 'Password require minimum 6 characters').isLength({ min: 6})
    ],
    userController.createUser
)

module.exports = router;