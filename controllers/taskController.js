const Task = require("../models/Task");
const Projects = require("../models/Projects");
const { validationResult } = require("express-validator");

//create Task
exports.createTask = async (req, res) => {
  //validate error

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Extract Project and check if exist

  const { project } = req.body;


  try {
    const projectExist = await Projects.findById(project);
    if (!projectExist) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //verify creator project

    if (projectExist.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not autorized" });
    }

    //create task
    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};

//get Task

exports.getTask = async (req, res) => {
  //Extract Project and check if exist

  const { project } = req.query;
  try {
    const projectExist = await Projects.findById(project);
    if (!projectExist) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //verify creator project

    if (projectExist.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not autorized" });
    }

    //get task for project

    const tasks = await Task.find({ project });
    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};

//update Task

exports.updateTask = async (req, res) => {

    //Extract project
  const { project, name } = req.body;

  try {

    //if task exist or not

    let taskExist = await Task.findById(req.params.id);

    if(!taskExist){
        return res.status(404).json({msg: 'Not exist'})
    }

    const projectExist = await Projects.findById(project);

    if (projectExist.creator.toString() !== req.user.id) {
        return res.status(401).json({ msg: "not autorized" });
      }

    //create object with new info

    const newTask = {};

    if(name){
        newTask.name = name;
    }

    //save Task
    taskExist = await Task.findOneAndUpdate({_id : req.params.id}, newTask, {new: true});

    res.json({taskExist})






  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};

//Delete task

exports.deleteTask = async (req, res) =>{

//Extract project
  const { project } = req.query;

  try {

    //if task exist or not

    let taskExist = await Task.findById(req.params.id);

    if(!taskExist){
        return res.status(404).json({msg: 'Not exist'})
    }

    const projectExist = await Projects.findById(project);

    if (projectExist.creator.toString() !== req.user.id) {
        return res.status(401).json({ msg: "not autorized" });
    }


    //delete task

    await Task.findOneAndRemove({_id: req.params.id });
    res.json({msg:'Delete task succesfully'})


    
  } catch(error){
    console.log(error);
    res.status(500).send("Error");

  }



}
