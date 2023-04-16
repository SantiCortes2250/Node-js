const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')


//create projects
//api/projects

router.post('/',
    auth,
    [
        check('name', 'Name is obligate').not().isEmpty(),
    ],
    projectController.createProject


)

//obtend projects

router.get('/',
    auth,
    projectController.ObtendProjects


)


//Update Projects for ID

router.put('/:id',
    auth,
    [
        check('name', 'Name is obligate').not().isEmpty(),
    ],
    projectController.updateProject


)

//Delete Projects for ID

router.delete('/:id',
    auth,
    projectController.deleteProjects


)


module.exports = router;