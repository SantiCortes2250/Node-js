const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//create task
//api/tasks

router.post(
  "/",
  auth,
  [
    check("name", "Name is obligate").not().isEmpty(),
    check("project", "Project is obligate").not().isEmpty(),
  ],
  taskController.createTask
);

//get task for project
//api/tasks

router.get("/", 
auth, 
taskController.getTask);

//update task for ID
//api/tasks/id

router.put("/:id",
    auth,
    taskController.updateTask

)

//delete task for ID
//api/tasks/id

router.delete("/:id",
    auth,
    taskController.deleteTask

)

module.exports = router;
