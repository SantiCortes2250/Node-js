const Projects = require('../models/Projects')
const { validationResult } = require('express-validator')



//create new project
exports.createProject = async (req, res) =>{

    //validate error

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }


    try {
        //Create new project

        const project = new Projects(req.body);

        //save creator of project obtend with JWT
        project.creator = req.user.id;

        //save project
        project.save();
        res.json(project)
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
        
    }
}

//Obtend all projects of the actual user

exports.ObtendProjects = async (req,  res) =>{
    try {
        const projects = await Projects.find({ creator: req.user.id }).sort({ Create: -1});
        res.json({ projects });
        

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
        
    }
}


//update projects for ID

exports.updateProject = async (req, res) =>{
     //validate error

     const errors = validationResult(req)
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()})
     }

     //extract info project
     const { name } = req.body;
     const newProject = {};

     if(name){
        newProject.name = name;
     }

     try {
        // check ID
        let project = await Projects.findById(req.params.id)


        //If project exist or not
        if(!project){
            return res.status(400).json({msg: 'project not found'})
        }


        //verify creator project

        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'not autorized'})
        }


        //Update

        project = await Projects.findByIdAndUpdate({_id: req.params.id}, { $set: newProject}, {new: true});

        res.json({project});
        
     } catch (error) {
        console.log(error)
        res.status(500).send('Error in the server')
        
     }

}

//Delete projects for ID

exports.deleteProjects = async (req, res) =>{
    try {
        // check ID
        let project = await Projects.findById(req.params.id)


        //If project exist or not
        if(!project){
            return res.status(400).json({msg: 'project not found'})
        }


        //verify creator project

        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'not autorized'})
        }


        //Delete project

        await Projects.findOneAndRemove({_id: req.params.id });
        res.json({msg:'Delete project succesfully'})
        
    }catch (error) {
            console.log(error)
            res.status(500).send('Error in the server')
            
         }



}



