const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')


exports.authenticateUser = async (req, res) =>{
    //validate erros
    const errors = validationResult(req);
    if( !errors.isEmpty ()){
        return res.status(400).json({errors: errors.array()})
    }

    const { email, password } = req.body;

    try{

        //validate if the user is registered
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ msg : 'user dont exist'})
        }

        //validate password
        const passCorrect = await bcryptjs.compare(password, user.password)
        if(!passCorrect){
            return res.status(400).json({msg: 'Incorrect Password'})
        }

        //If all is correct create and sing JWT(Json Web Token)
        const payload = {
            user:{
                id: user.id
            }

        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 //expire token in one hour
        }, (error, Token) => {
            if(error) throw error;

             //Massage
            res.json({ Token })
        })




    }catch(error){
        console.error();
    
    }
}


//get user Authenticated
exports.userAuthenticated = async (req, res) =>{
    try {
        const user = await User.findById(req.user.id)
        res.json({user})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Error'})
        
    }
}