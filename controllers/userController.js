const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async(req, res) =>{


    //validate erros
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password, register} = req.body;


    try {

        //validate that the registered user is unique
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ msg: 'user exist'})
        }

        //create new user
        user = new User(req.body);

        //Hashear password

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt)

        //save new user
        await user.save();

        //create and sing JWT(Json Web Token)
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

       
    } catch (error) {
        console.log(error)
        res.status(400).send('Error')
        
    }
   

}